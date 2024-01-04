export type TypeServerChannels = 'server:update_tables'

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

type TypeBuyIn = {
  min: number
  max: number
}

type TypeSeat = {
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
  isFold: boolean
  isSeatout: boolean
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
  pot: number
  total: number
  cards: TypeCard[]
}

export type TypeHandleClientJoinTable = {
  tableId: number
  username: string
}

export type TypeHandleClientSitTable = {
  tableId: number
  seatId: number
  buyinAmount: number
  username: string
}

export type TypeHandleClientCallAction = {
  tableId: number
  callActionAmount: number
  username: string
}

export type TypeHandleClientRaiseAction = {
  tableId: number
  raiseActionAmount: number
  username: string
}

export type TypeScoreAndAchivement = { score: number; achievement: string }

export type TypeScoreAndAchivements = { [key: string]: TypeScoreAndAchivement }
