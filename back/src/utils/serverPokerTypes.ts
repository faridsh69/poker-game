export type TypeServerChannels = 'server:update_tables'

export type TypeTableType = 'holdem' | 'omaha'

export type TypeTablePhase = 'wait' | 'preflop' | 'flop' | 'turn' | 'river' | 'show' | 'finish'

export type TypeAction = 'check' | 'call' | 'raise' | 'fold' | 'checkfold'

export type TypeTimerAction = 'leaveSeat' | 'checkfold' | 'restartTable' | 'clearTable'

export type TypeCardType = 'diamonds' | 'clubs' | 'spades' | 'hearts'

export type TypeSeatRole =
  | 'small'
  | 'big'
  | 'underTheGun'
  | 'underTheGunPlusOne'
  | 'underTheGunPlusTwo'
  | 'lowJack'
  | 'highJack'
  | 'cutOff'
  | 'dealer'

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
  | 'timeBankAction'

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
  | 'client:timebank_action'

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
  role: TypeSeatRole | null
  user: TypeUser | null
}

export type TypeCard = {
  type: TypeCardType
  number: TypeCardNumber
}

type TypeCash = {
  inBank: number
  inGame: number
  inPot: number
}

export type TypeTimer = {
  deadline: number
  action: string
  extra: boolean
}

export type TypeUser = {
  username: string
  avatar: string
  cash: TypeCash
  cards: TypeCard[]
  isWinner: boolean
  achievement: string
  isFold: boolean
  isSeatout: boolean
  timer: TypeTimer | null
  timeBank: number
  // hot: number
}

export type TypeTable = {
  id: number
  title: string
  type: TypeTableType
  blinds: TypeBlinds
  buyin: TypeBuyIn
  waitingUsers: TypeUser[]
  seats: TypeSeat[]
  phase: TypeTablePhase
  pot: number
  total: number
  cards: TypeCard[]
  roleTurn: TypeSeatRole | null
  timer: TypeTimer | null
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

export type TypeLastAction = {
  username: string
  tableId: number
  action: TypeAction
}
