import { Socket } from 'socket.io-client'

export type TypeSocket = Socket

export type TypeServerChannelsUpdateTablesData = {
  tables: TypeTable[]
  message: string
  checkJoinTabls: boolean
}

export type TypeSeatModal = {
  tableId: number
  seatId: number
}

type TypeBuyIn = {
  min: number
  max: number
}

export type TypeSeat = {
  id: number
  user: TypeUser
}

export type TypeCardNumber =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'j'
  | 'q'
  | 'k'
  | 'a'

export type TypeCardType = 'diamonds' | 'clubs' | 'spades' | 'hearts'

export type TypeCard = {
  type: TypeCardType
  number: TypeCardNumber
}

type TypeCash = {
  inBank: number
  inGame: number
  inPot: number
}

export type TypeUser = {
  username: string
  avatar: string
  cash: TypeCash
  cards: TypeCard[]
  isDealer: boolean
  gameTurn: boolean
  isWinner: boolean
  achievement: string
  // hot: number
}

export type TypeTableType = 'holdem' | 'omaha'

export type TypeTablePhase = 'wait' | 'preflop' | 'flop' | 'turn' | 'river' | 'show'

export type TypeTable = {
  id: number
  title: string
  type: TypeTableType
  small: number
  big: number
  buyin: TypeBuyIn
  waitingUsers: TypeUser[]
  seats: TypeSeat[]
  phase: TypeTablePhase
  cards: TypeCard[]
  pot: number
}

export type TypeHandleSitTableModal = (tableId: number, seatId: number) => void
