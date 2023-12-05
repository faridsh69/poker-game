import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'

import { CLIENT_CHANNELS, SERVER_CHANNELS, TABLES } from './serverConstantsPoker'
import {
  renderJoinTable,
  renderQuitTable,
  renderSitUser,
  renderSitoutUser,
} from './serverHelpersPoker'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:2000', 'https://admin.socket.io'],
    credentials: true,
    // methods: ['GET', 'POST'],
  },
})
export class ServerPokerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  tablesState = TABLES

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

  handleDisconnect() {
    // Handle disconnection event
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinTable)
  handleClientJoinTable(
    @MessageBody() { tableId, username }: any,
    @ConnectedSocket() clientSocket: Socket,
  ) {
    this.tablesState = renderJoinTable(this.tablesState, tableId, username)

    clientSocket.join(tableId)
    this.server.to(tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has joined table #${tableId}`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveTable)
  handleClientLeaveTable(
    @MessageBody() { tableId, username }: any,
    @ConnectedSocket() clientSocket: Socket,
  ) {
    this.tablesState = renderQuitTable(this.tablesState, tableId, username)

    this.server.to(tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has left table #${tableId}`,
      tables: this.tablesState,
    })
    clientSocket.leave(tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.sitTable)
  handleClientSitTable(@MessageBody() { tableId, seatId, username }: any) {
    this.tablesState = renderSitUser(this.tablesState, tableId, seatId, username)

    this.server.to(tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has been sit on seat #${seatId}`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.sitoutTable)
  handleClientSitoutTable(@MessageBody() { tableId, username }: any) {
    this.tablesState = renderSitoutUser(this.tablesState, tableId, username)

    this.server.to(tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has been sitout`,
      tables: this.tablesState,
    })
  }
}
