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

import { CLIENT_CHANNELS, SERVER_CHANNELS, TABLES } from 'src/table/serverConstantsPoker'
import {
  renderClientCallAction,
  renderClientCheckAction,
  renderClientJoinTable,
  renderClientQuitTable,
  renderClientRaiseAction,
  renderClientSitTable,
  renderClientSitoutTable,
  renderStartTable,
} from 'src/table/serverHelpersPoker'
import {
  TypeHandleClientCallAction,
  TypeHandleClientJoinTable,
  TypeHandleClientRaiseAction,
  TypeHandleClientSitTable,
  TypeTable,
} from 'src/utils/types'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:2000', 'https://admin.socket.io'],
    credentials: true,
  },
})
export class ServerPokerGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  private tablesState: TypeTable[] = TABLES

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
    this.tablesState = renderClientQuitTable(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has left table #${tableId}`,
      tables: this.tablesState,
    })
    clientSocket.leave('' + tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.sitTable)
  handleClientSitTable(
    @MessageBody() { tableId, seatId, buyinAmount, username }: TypeHandleClientSitTable,
  ) {
    this.tablesState = renderClientSitTable(
      this.tablesState,
      tableId,
      seatId,
      buyinAmount,
      username,
    )
    this.tablesState = renderStartTable(this.tablesState, tableId)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has been sit on seat #${seatId}`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.sitoutTable)
  handleClientSitoutTable(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    this.tablesState = renderClientSitoutTable(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has been sitout`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.checkAction)
  handleClientCheckAction(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    this.tablesState = renderClientCheckAction(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} checked.`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.callAction)
  handleClientCallAction(
    @MessageBody() { tableId, callActionAmount, username }: TypeHandleClientCallAction,
  ) {
    this.tablesState = renderClientCallAction(this.tablesState, tableId, callActionAmount, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} checked.`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.raiseAction)
  handleClientRaiseAction(
    @MessageBody() { tableId, raiseActionAmount, username }: TypeHandleClientRaiseAction,
  ) {
    this.tablesState = renderClientRaiseAction(
      this.tablesState,
      tableId,
      raiseActionAmount,
      username,
    )

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} checked.`,
      tables: this.tablesState,
    })
  }
}
