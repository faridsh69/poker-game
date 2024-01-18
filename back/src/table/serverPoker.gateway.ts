import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'

import {
  ACTION_NAMES,
  CLIENT_CHANNELS,
  SERVER_CHANNELS,
  TABLES,
} from 'src/utils/serverPokerConstants'
import {
  renderClientJoinGame,
  renderClientJoinSeat,
  renderClientJoinTable,
  renderClientLeaveGame,
  renderClientLeaveSeat,
  renderClientLeaveTable,
  renderGeneralClientActions,
  renderServerStartTable,
} from 'src/table/serverPokerControllers'
import {
  TypeHandleClientCallAction,
  TypeHandleClientJoinTable,
  TypeHandleClientRaiseAction,
  TypeHandleClientSitTable,
  TypeTable,
} from 'src/utils/serverPokerTypes'
import { getTable, isWaitPhase } from './serverPokerServices'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:2000', 'https://admin.socket.io', 'http://85.215.241.88'],
    credentials: true,
  },
})
export class ServerPokerGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  private tablesState: TypeTable[] = TABLES

  private tableTimeouts = {}

  updateTablesState = (tables: TypeTable[]) => {
    this.tablesState = tables
  }

  afterInit() {
    instrument(this.server, {
      auth: false,
      mode: 'development',
    })
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
    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveTable)
  handleClientLeaveTable(
    @MessageBody() { tableId, username }: TypeHandleClientJoinTable,
    @ConnectedSocket() clientSocket: Socket,
  ) {
    // Validations: check user is joined before as waiting user in this table

    this.tablesState = renderClientLeaveTable(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
    })
    clientSocket.leave('' + tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinSeat)
  handleClientJoinSeat(@MessageBody() { tableId, seatId, username }: TypeHandleClientSitTable) {
    // Validations: check user is joined before as waiting user in this table, also he is not seated

    this.tablesState = renderClientJoinSeat(this.tablesState, tableId, seatId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveSeat)
  handleClientLeaveSeat(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check user is seated beforein this table

    this.tablesState = renderClientLeaveSeat(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinGame)
  handleClientJoinGame(
    @MessageBody() { tableId, username, buyinAmount }: TypeHandleClientSitTable,
  ) {
    this.tablesState = renderClientJoinGame(this.tablesState, tableId, username, buyinAmount)

    const table = getTable(this.tablesState, tableId)
    if (isWaitPhase(table)) {
      this.tablesState = renderServerStartTable(this.tablesState, tableId)
    }

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveGame)
  handleClientLeaveGame(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    this.tablesState = renderClientLeaveGame(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.foldAction)
  handleClientFoldAction(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check if user is able to fold, also is itt his tturn ....

    renderGeneralClientActions(
      this.server,
      this.tablesState,
      this.updateTablesState,
      this.tableTimeouts,
      tableId,
      username,
      ACTION_NAMES.fold,
    )
  }

  @SubscribeMessage(CLIENT_CHANNELS.checkAction)
  handleClientCheckAction(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check user can do check or he should call/fold, also is it user turn
    // check two person are seating in table, check table phase is not waiting

    renderGeneralClientActions(
      this.server,
      this.tablesState,
      this.updateTablesState,
      this.tableTimeouts,
      tableId,
      username,
      ACTION_NAMES.check,
    )
  }

  @SubscribeMessage(CLIENT_CHANNELS.callAction)
  handleClientCallAction(
    @MessageBody() { tableId, callActionAmount, username }: TypeHandleClientCallAction,
  ) {
    // Validations: check user can call this amount, also is it user turn
    // check two person are seating in table, check table phase is not waiting

    renderGeneralClientActions(
      this.server,
      this.tablesState,
      this.updateTablesState,
      this.tableTimeouts,
      tableId,
      username,
      ACTION_NAMES.call,
      callActionAmount,
    )
  }

  @SubscribeMessage(CLIENT_CHANNELS.raiseAction)
  handleClientRaiseAction(
    @MessageBody() { tableId, raiseActionAmount, username }: TypeHandleClientRaiseAction,
  ) {
    // Validations: check user can raise this amount, also is it user turn
    // check two person are seating in table, check table phase is not waiting

    renderGeneralClientActions(
      this.server,
      this.tablesState,
      this.updateTablesState,
      this.tableTimeouts,
      tableId,
      username,
      ACTION_NAMES.raise,
      raiseActionAmount,
    )
  }
}
