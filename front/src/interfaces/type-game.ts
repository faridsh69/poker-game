type TypeBuyIn = {
  min: number
  max: number
}

type TypeCash = {
  out: number
  inPot: number
  inGame: number
}

type TypeUser = {
  id: number
  username: string
  avatar: string
  cash: TypeCash
  status: string
  hot: number
  cards: string[]
  isDealer: boolean
}

type TypeSeat = {
  id: number
  user: TypeUser
}

export type TypeTable = {
  id: number
  title: string
  type: string
  buyin: TypeBuyIn
  small: number
  big: number
  status: string
  phase: string
  cards: string[]
  waitingUsers: TypeUser[]
  seats: TypeSeat[]
}
