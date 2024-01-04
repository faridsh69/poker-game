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
  CLIENT_CHANNELS,
  SERVER_CHANNELS,
  START_NEW_ROUND_TIMEOUT,
  TABLES,
} from 'src/utils/serverPokerConstants'
import {
  renderClientCallAction,
  renderClientCheckAction,
  renderClientFoldAction,
  renderClientJoinGame,
  renderClientJoinSeat,
  renderClientJoinTable,
  renderClientLeaveGame,
  renderClientLeaveSeat,
  renderClientLeaveTable,
  renderClientRaiseAction,
  renderServerStartTable,
} from 'src/table/serverPokerControllers'
import {
  TypeHandleClientCallAction,
  TypeHandleClientJoinTable,
  TypeHandleClientRaiseAction,
  TypeHandleClientSitTable,
  TypeTable,
} from 'src/utils/serverPokerTypes'
import { isTimeToRestartTable } from 'src/table/serverPokerServices'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:2000', 'https://admin.socket.io', 'http://85.215.241.88/'],
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
      message: `${username} has left table #${tableId}`,
      tables: this.tablesState,
    })
    clientSocket.leave('' + tableId)
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinSeat)
  handleClientJoinSeat(@MessageBody() { tableId, seatId, username }: TypeHandleClientSitTable) {
    // Validations: check user is joined before as waiting user in this table, also he is not seated

    this.tablesState = renderClientJoinSeat(this.tablesState, tableId, seatId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has been sit on seat #${seatId}`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveSeat)
  handleClientLeaveSeat(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check user is seated beforein this table

    this.tablesState = renderClientLeaveSeat(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} has been sitout`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.joinGame)
  handleClientJoinGame(
    @MessageBody() { tableId, username, buyinAmount }: TypeHandleClientSitTable,
  ) {
    this.tablesState = renderClientJoinGame(this.tablesState, tableId, username, buyinAmount)

    this.tablesState = renderServerStartTable(this.tablesState, tableId)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username}: Hello All.`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.leaveGame)
  handleClientLeaveGame(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    this.tablesState = renderClientLeaveGame(this.tablesState, tableId, username)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} sit out.`,
      tables: this.tablesState,
    })
  }

  @SubscribeMessage(CLIENT_CHANNELS.foldAction)
  handleClientFoldAction(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check if user is able to fold, also is itt his tturn ....

    this.tablesState = renderClientFoldAction(this.tablesState, tableId)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} fold.`,
      tables: this.tablesState,
      lastAction: {
        username,
        action: 'Fold',
        tableId,
      },
    })

    if (isTimeToRestartTable(this.tablesState, tableId)) {
      setTimeout(() => {
        this.tablesState = renderServerStartTable(this.tablesState, tableId)
        this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
          tables: this.tablesState,
        })
      }, START_NEW_ROUND_TIMEOUT)
    }

    // // handle stop in timere age ke actioni biad
    // setTimeout(() => {
    //   console.log('XXXXXXXXXX')
    //   this.tablesState = renderServerAutoCheckFold(this.tablesState, tableId)
    //   this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    //     message: `${username} thinking time finished.`,
    //     tables: this.tablesState,
    //   })
    // }, USER_ACTION_THINKING_TIMEOUT)
  }

  @SubscribeMessage(CLIENT_CHANNELS.checkAction)
  handleClientCheckAction(@MessageBody() { tableId, username }: TypeHandleClientJoinTable) {
    // Validations: check user can do check or he should call/fold, also is it user turn
    // check two person are seating in table, check table phase is not waiting

    this.tablesState = renderClientCheckAction(this.tablesState, tableId)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} checked.`,
      tables: this.tablesState,
      lastAction: {
        username,
        action: 'Check',
        tableId,
      },
    })

    if (isTimeToRestartTable(this.tablesState, tableId)) {
      setTimeout(() => {
        this.tablesState = renderServerStartTable(this.tablesState, tableId)
        this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
          tables: this.tablesState,
        })
      }, START_NEW_ROUND_TIMEOUT)
    }

    // handle stop in timere age ke actioni biad
    // setTimeout(() => {
    //   console.log('XXXXXXXXXX')
    //   this.tablesState = renderServerAutoCheckFold(this.tablesState, tableId)
    //   this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    //     message: `${username} thinking time finished.`,
    //     tables: this.tablesState,
    //   })
    // }, USER_ACTION_THINKING_TIMEOUT)
  }

  @SubscribeMessage(CLIENT_CHANNELS.callAction)
  handleClientCallAction(
    @MessageBody() { tableId, callActionAmount, username }: TypeHandleClientCallAction,
  ) {
    // Validations: check user can call this amount, also is it user turn
    // check two person are seating in table, check table phase is not waiting

    this.tablesState = renderClientCallAction(this.tablesState, tableId, callActionAmount)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} called ${callActionAmount}$.`,
      tables: this.tablesState,
      lastAction: {
        username,
        action: 'Call',
        tableId,
      },
    })

    // handle stop in timere age ke actioni biad
    // setTimeout(() => {
    //   console.log('XXXXXXXXXX')
    //   this.tablesState = renderServerAutoCheckFold(this.tablesState, tableId)
    //   this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    //     message: `${username} thinking time finished.`,
    //     tables: this.tablesState,
    //   })
    // }, USER_ACTION_THINKING_TIMEOUT)

    if (isTimeToRestartTable(this.tablesState, tableId)) {
      setTimeout(() => {
        this.tablesState = renderServerStartTable(this.tablesState, tableId)
        this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
          tables: this.tablesState,
        })
      }, START_NEW_ROUND_TIMEOUT)
    }
  }

  @SubscribeMessage(CLIENT_CHANNELS.raiseAction)
  handleClientRaiseAction(
    @MessageBody() { tableId, raiseActionAmount, username }: TypeHandleClientRaiseAction,
  ) {
    // Validations: check user can raise this amount, also is it user turn
    // check two person are seating in table, check table phase is not waiting

    this.tablesState = renderClientRaiseAction(this.tablesState, tableId, raiseActionAmount)

    this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
      message: `${username} raised ${raiseActionAmount}$.`,
      tables: this.tablesState,
      lastAction: {
        username,
        action: 'Raise',
        tableId,
      },
    })

    // handle stop in timere age ke actioni biad
    // setTimeout(() => {
    //   console.log('XXXXXXXXXX')
    //   this.tablesState = renderServerAutoCheckFold(this.tablesState, tableId)
    //   this.server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    //     message: `${username} thinking time finished.`,
    //     tables: this.tablesState,
    //   })
    // }, USER_ACTION_THINKING_TIMEOUT)
  }
}
