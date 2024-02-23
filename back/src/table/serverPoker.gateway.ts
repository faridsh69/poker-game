import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'

import { ACTION_NAMES, CLIENT_CHANNELS, SERVER_CHANNELS, TABLES, TIMER_ACTION_NAMES } from 'src/utils/serverPokerConstants'
import {
  renderClientJoinGame,
  renderClientJoinSeat,
  renderClientJoinTable,
  renderClientLeaveGame,
  renderClientLeaveSeat,
  renderClientLeaveTable,
  renderClientShowCardAction,
  renderClientStradle,
  renderClientTimeBankAction,
  renderClientWaitForBB,
  renderGeneralClientActions,
  renderServerClearTable,
  renderServerStartTable,
  renderUpdateClients,
} from 'src/table/serverPokerControllers'
import {
  TypeAction,
  TypeHandleClientCallAction,
  TypeHandleClientJoinTable,
  TypeHandleClientRaiseAction,
  TypeHandleClientShowCardAction,
  TypeHandleClientSitTable,
  TypeTable,
} from 'src/utils/serverPokerTypes'
import { getDeadline, isAtLeastTwoPlayers } from './serverPokerServices'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:2000', 'https://admin.socket.io', 'http://85.215.241.88'],
    credentials: true,
  },
})
export class ServerPokerGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server!: Server

  private tablesState: TypeTable[] = TABLES

  updateTablesState = (tables: TypeTable[]) => {
    this.tablesState = tables
  }

  afterInit() {
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
          console.log('#1 setInterval table timer action', table.timer.action)

          if (table.timer.action === TIMER_ACTION_NAMES.restartTable) {
            if (!isAtLeastTwoPlayers(table, true, false, true, false, true, false)) continue

            this.tablesState = renderServerStartTable(this.tablesState, table.id)
            renderUpdateClients(this.server, this.tablesState, table.id)
          }

          if (table.timer.action === TIMER_ACTION_NAMES.clearTable) {
            this.tablesState = renderServerClearTable(this.tablesState, table.id)
            renderUpdateClients(this.server, this.tablesState, table.id)
          }
        }
      }
    }, 1000)
  }

  handleConnection(clientSocket: Socket) {
    clientSocket.emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
      checkJoinTabls: true,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinTable)
  handleClientJoinTable(
    @MessageBody() { tableId, username }: TypeHandleClientJoinTable,
    @ConnectedSocket() clientSocket: Socket,
  ) {
    // Validations: check user not joined this table before
    this.tablesState = renderClientJoinTable(this.tablesState, tableId, username)

    clientSocket.join('' + tableId)
    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveTable)
  handleClientLeaveTable(
    @MessageBody() { tableId, username }: TypeHandleClientJoinTable,
    @ConnectedSocket() clientSocket: Socket,
  ) {
    // Validations: check user is joined before as waiting user in this table
    this.tablesState = renderClientLeaveTable(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
    clientSocket.leave('' + tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinSeat)
  handleClientJoinSeat(@MessageBody() { tableId, seatId, username }: TypeHandleClientSitTable) {
    // Validations: check user is joined before as waiting user in this table, also he is not seated
    this.tablesState = renderClientJoinSeat(this.tablesState, tableId, seatId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  // @SubscribeMessage(CLIENT_CHANNELS.leaveSeat)
  // handleClientLeaveSeat(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
  //   // Validations: check user is seated before this table
  //   this.tablesState = renderClientLeaveSeat(this.tablesState, tableId, username)

  //   renderUpdateClients(this.server, this.tablesState, tableId)
  // }

  @SubscribeMessage(CLIENT_CHANNELS.joinGame)
  handleClientJoinGame(@MessageBody() { tableId, username, buyinAmount }: TypeHandleClientSitTable) {
    this.tablesState = renderClientJoinGame(this.tablesState, tableId, username, buyinAmount)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.waitForBB)
  handleClientWaitForBB(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    this.tablesState = renderClientWaitForBB(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveGame)
  handleClientLeaveGame(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    this.tablesState = renderClientLeaveGame(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.foldAction)
  handleClientFoldAction(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check if user is able to fold, also is itt his tturn ....
    this.handleClientAction(tableId, username, ACTION_NAMES.fold)
  }

  @SubscribeMessage(CLIENT_CHANNELS.checkAction)
  handleClientCheckAction(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check user can do check or he should call/fold, also is it user turn
    // check two person are seating in table, check table phase is not waiting
    this.handleClientAction(tableId, username, ACTION_NAMES.check)
  }

  @SubscribeMessage(CLIENT_CHANNELS.callAction)
  handleClientCallAction(@MessageBody() { tableId, callActionAmount, username }: TypeHandleClientCallAction) {
    // Validations: check user can call this amount, also is it user turn
    // check two person are seating in table, check table phase is not waiting
    this.handleClientAction(tableId, username, ACTION_NAMES.call, callActionAmount)
  }

  @SubscribeMessage(CLIENT_CHANNELS.raiseAction)
  handleClientRaiseAction(@MessageBody() { tableId, raiseActionAmount, username }: TypeHandleClientRaiseAction) {
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
  handleClientShowCardAction(@MessageBody() { tableId, username, cardIndexes }: TypeHandleClientShowCardAction) {
    // Validations: check if use can do show his cards
    this.tablesState = renderClientShowCardAction(this.tablesState, tableId, username, cardIndexes)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.stradle)
  handleClientStradle(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    this.tablesState = renderClientStradle(this.tablesState, tableId, username)

    renderUpdateClients(this.server, this.tablesState, tableId)
  }
}
