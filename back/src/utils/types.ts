type TypeBuyIn = {
  min: number
  max: number
}

type TypeSeat = {
  id: number
  user: TypeUser
}

export type TypeCard = {
  type: string
  number: string
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
  // id: number
  // status: string
  // hot: number
}

export type TypeTable = {
  id: number
  title: string
  type: string
  small: number
  big: number
  buyin: TypeBuyIn
  waitingUsers: TypeUser[]
  seats: TypeSeat[]
  phase: string
  cards: TypeCard[]
}
