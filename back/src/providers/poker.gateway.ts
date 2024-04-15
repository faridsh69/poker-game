import { Server, Socket } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets'

import { runTests } from 'src/tests/testData'
import { TablesService } from 'src/services/tables.service'
import { Table } from 'src/models/table.entity'
import { CORS_ORIGINS } from 'src/configs/envConfig'
import { SocketAuthMiddleware } from 'src/middlewares/SocketAuthMiddleware'
import { getAuthUserCashInGame, getDeadline, isAtLeastTwoPlayers } from 'src/services/poker.service'
import { ACTION_NAMES, CLIENT_CHANNELS, SERVER_CHANNELS, TIMER_ACTION_NAMES } from 'src/configs/serverPokerConstants'
import {
  TypeAction,
  TypeHandleClientCallAction,
  TypeHandleClientJoinTable,
  TypeHandleClientRaiseAction,
  TypeHandleClientShowCardAction,
  TypeHandleClientSitTable,
  TypeTable,
} from 'src/interfaces/serverPokerTypes'
import {
  renderClientJoinGame,
  renderClientJoinSeat,
  renderClientJoinTable,
  renderClientLeaveGame,
  renderClientLeaveSeat,
  renderClientLeaveTable,
  renderClientSeatoutNextRound,
  renderClientShowCardAction,
  renderClientStradle,
  renderClientTimeBankAction,
  renderClientWaitForBB,
  renderGeneralClientActions,
  renderServerClearTable,
  renderServerStartTable,
  renderUpdateClients,
} from 'src/controllers/poker.controller'
import { PaymentsService } from 'src/services/payments.service'
import { TransactionsService } from 'src/services/transactions.service'
import { User } from 'src/models/user.entity'
import { Payment } from 'src/models/payment.entity'
import { Transaction } from 'src/models/transaction.entity'
import { TRANSACTIONS_REASONS } from 'src/configs/database'

@Module({
  imports: [TypeOrmModule.forFeature([Table, Payment, Transaction])],
  providers: [TablesService, PaymentsService, TransactionsService],
})
@WebSocketGateway({
  cors: {
    origin: CORS_ORIGINS,
    credentials: true,
  },
})
export class PokerGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tablesService: TablesService,
    private readonly paymentsService: PaymentsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @WebSocketServer()
  server!: Server

  private tablesState: TypeTable[] = []

  private updateTablesState = (tables: TypeTable[]) => {
    this.tablesState = tables
  }

  private getAuthUsername = (client: Socket): string => {
    // @ts-ignore
    return client.userx.username
  }

  private getAuthUser = async (client: Socket): Promise<User> => {
    // @ts-ignore
    const user: User = client.userx
    const paymentSum = await this.paymentsService.findUserBalance(user.id)
    const transactionSum = await this.transactionsService.findUserBalance(user.id)
    const balance = paymentSum + transactionSum

    // @ts-ignore
    return { ...user, balance }
  }

  private saveTransaction = async (client: Socket, buyinAmount: number, tableId: number, userGiving: boolean): Promise<void> => {
    // @ts-ignore
    const user: User = client.userx

    const model = new Transaction()
    model.user_id = user.id
    model.price = buyinAmount
    model.user_giving = userGiving
    model.reason = TRANSACTIONS_REASONS.buyin
    model.table_id = tableId
    model.description = ''
    model.bonus_code_id = 0

    this.transactionsService.create(model)
  }

  async afterInit(client: Socket) {
    client.use(SocketAuthMiddleware(this.jwtService) as any)

    instrument(this.server, {
      auth: false,
      mode: 'development',
    })

    setInterval(() => {
      const nowtime = getDeadline()
      for (const table of this.tablesState) {
        for (const seat of table.seats) {
          if (!seat.user) continue
          if (!seat.user.timer) continue

          if (nowtime > seat.user.timer.deadline) {
            console.log('#1 setInterval seat user timer action', seat.user.timer.action)

            if (seat.user.timer.action === TIMER_ACTION_NAMES.leaveSeat) {
              this.tablesState = renderClientLeaveSeat(this.tablesState, table.id, seat.user.username)

              renderUpdateClients(this.server, this.tablesState, table.id)
            }

            if (seat.user.timer.action === TIMER_ACTION_NAMES.checkfold) {
              this.handleClientAction(table.id, seat.user.username, ACTION_NAMES.checkfold)
            }
          }
        }

        if (!table.timer) continue

        if (nowtime > table.timer.deadline) {
          console.log('#2 setInterval table timer action', table.timer.action)

          if (table.timer.action === TIMER_ACTION_NAMES.restartTable) {
            if (!isAtLeastTwoPlayers(table, true, false, true, false, true, false)) {
              this.tablesState = renderServerClearTable(this.tablesState, table.id)
              renderUpdateClients(this.server, this.tablesState, table.id)
              continue
            }

            this.tablesState = renderServerStartTable(this.tablesState, table.id)
            renderUpdateClients(this.server, this.tablesState, table.id)
          }

          if (table.timer.action === TIMER_ACTION_NAMES.clearTable) {
            this.tablesState = renderServerClearTable(this.tablesState, table.id)
            renderUpdateClients(this.server, this.tablesState, table.id)
          }
        }
      }
    }, 4000)
    const tables = await this.tablesService.getWithSeats()
    // @ts-ignore
    this.updateTablesState(tables)
  }

  handleConnection(socket: Socket) {
    socket.emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
      checkJoinTabls: true,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinTable)
  handleClientJoinTable(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    runTests()
    const username = this.getAuthUsername(socket)
    // Validations: check user not joined this table before
    this.tablesState = renderClientJoinTable(this.tablesState, tableId, username)

    socket.join('' + tableId)
    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveTable)
  handleClientLeaveTable(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    // Validations: check user is joined before as waiting user in this table
    this.tablesState = renderClientLeaveTable(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
    socket.leave('' + tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinSeat)
  async handleClientJoinSeat(@MessageBody() { tableId, seatId }: TypeHandleClientSitTable, @ConnectedSocket() socket: Socket) {
    const user = await this.getAuthUser(socket)
    // Validations: check user is joined before as waiting user in this table, also he is not seated
    this.tablesState = renderClientJoinSeat(this.tablesState, tableId, seatId, user)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinGame)
  handleClientJoinGame(@MessageBody() { tableId, buyinAmount }: TypeHandleClientSitTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    this.tablesState = renderClientJoinGame(this.tablesState, tableId, username, buyinAmount)

    this.saveTransaction(socket, buyinAmount, tableId, false)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.waitForBB)
  handleClientWaitForBB(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    this.tablesState = renderClientWaitForBB(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveGame)
  handleClientLeaveGame(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    this.tablesState = renderClientLeaveGame(this.tablesState, tableId, username)
    const reward = getAuthUserCashInGame(this.tablesState, tableId, username)
    this.saveTransaction(socket, reward, tableId, true)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.foldAction)
  handleClientFoldAction(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    // Validations: check if user is able to fold, also is itt his tturn ....
    this.handleClientAction(tableId, username, ACTION_NAMES.fold)
  }

  @SubscribeMessage(CLIENT_CHANNELS.checkAction)
  handleClientCheckAction(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    // Validations: check user can do check or he should call/fold, also is it user turn
    // check two person are seating in table, check table phase is not waiting
    this.handleClientAction(tableId, username, ACTION_NAMES.check)
  }

  @SubscribeMessage(CLIENT_CHANNELS.callAction)
  handleClientCallAction(
    @MessageBody() { tableId, callActionAmount }: TypeHandleClientCallAction,
    @ConnectedSocket() socket: Socket,
  ) {
    const username = this.getAuthUsername(socket)
    // Validations: check user can call this amount, also is it user turn
    // check two person are seating in table, check table phase is not waiting
    this.handleClientAction(tableId, username, ACTION_NAMES.call, callActionAmount)
  }

  @SubscribeMessage(CLIENT_CHANNELS.raiseAction)
  handleClientRaiseAction(
    @MessageBody() { tableId, raiseActionAmount }: TypeHandleClientRaiseAction,
    @ConnectedSocket() socket: Socket,
  ) {
    const username = this.getAuthUsername(socket)
    // Validations: check user can raise this amount, also is it user turn
    // check two person are seating in table, check table phase is not waiting
    this.handleClientAction(tableId, username, ACTION_NAMES.raise, raiseActionAmount)
  }

  handleClientAction(tableId: number, username: string, actionName: TypeAction, amount?: number) {
    renderGeneralClientActions(this.server, this.tablesState, this.updateTablesState, tableId, username, actionName, amount)
  }

  @SubscribeMessage(CLIENT_CHANNELS.timeBankAction)
  handleClientTimeBankAction(@MessageBody() { tableId }: TypeHandleClientJoinTable) {
    // Validations: check if its user game turn
    this.tablesState = renderClientTimeBankAction(this.tablesState, tableId)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.showCardAction)
  handleClientShowCardAction(
    @MessageBody() { tableId, cardIndexes }: TypeHandleClientShowCardAction,
    @ConnectedSocket() socket: Socket,
  ) {
    const username = this.getAuthUsername(socket)
    // Validations: check if use can do show his cards
    this.tablesState = renderClientShowCardAction(this.tablesState, tableId, username, cardIndexes)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.stradle)
  handleClientStradle(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    this.tablesState = renderClientStradle(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.seatoutNextRound)
  handleClientSeatoutNextRound(@MessageBody() { tableId }: TypeHandleClientJoinTable, @ConnectedSocket() socket: Socket) {
    const username = this.getAuthUsername(socket)
    this.tablesState = renderClientSeatoutNextRound(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }
}
