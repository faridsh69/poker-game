import { Socket } from 'socket.io-client'

export type TypeSocket = Socket

export type TypeTimerAction = 'leaveSeat' | 'checkfold' | 'restartTable'

export type TypeTimerType = 'text' | 'circle' | 'line'

export type TypeClientChannelKeys =
  | 'joinTable'
  | 'leaveTable'
  | 'joinSeat'
  | 'leaveSeat'
  | 'joinGame'
  | 'leaveGame'
  | 'foldAction'
  | 'checkAction'
  | 'callAction'
  | 'raiseAction'

export type TypeClientChannels =
  | 'client:join_table'
  | 'client:leave_table'
  | 'client:join_seat'
  | 'client:leave_seat'
  | 'client:join_game'
  | 'client:leave_game'
  | 'client:fold_action'
  | 'client:check_action'
  | 'client:call_action'
  | 'client:raise_action'

export type TypeServerChannelsUpdateTablesData = {
  tables: TypeTable[]
  message: string
  checkJoinTabls: boolean
  lastAction: TypeLastAction
}

export type TypeSeatModal = {
  tableId: number
  seatId: number
}

type TypeBuyIn = {
  min: number
  max: number
}

type TypeBlinds = {
  small: number
  big: number
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

type TypeTimer = {
  deadline: number
  action: string
  extra?: number
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
  isFold: boolean
  isSeatout: boolean
  timer: TypeTimer | null
  // hot: number
}

export type TypeTableType = 'holdem' | 'omaha'

export type TypeTablePhase = 'wait' | 'preflop' | 'flop' | 'turn' | 'river' | 'show' | 'finish'

export type TypeTable = {
  id: number
  title: string
  type: TypeTableType
  buyin: TypeBuyIn
  blinds: TypeBlinds
  waitingUsers: TypeUser[]
  seats: TypeSeat[]
  phase: TypeTablePhase
  cards: TypeCard[]
  pot: number
  total: number
}

export type TypeHandleSitTableModal = (tableId: number, seatId: number) => void

export type TypeAction = 'Check' | 'Call' | 'Raise' | 'Fold' | 'All-In'

export type TypeLastAction = {
  username: string
  tableId: number
  action: string
}

export type TypeRaiseLimits = {
  min: number
  step: number
  max: number
}

export type ChipColumnProp = {
  value: number
  count: number
  backgroundPosition: string
}
