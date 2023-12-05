import { Socket } from 'socket.io-client'
import { TypeTable } from './type-game'

export type TypeSocket = Socket

export type TypeServerChannelsUpdateTablesData = {
  tables: TypeTable[]
  message: string
  checkJoinTabls: boolean
}
