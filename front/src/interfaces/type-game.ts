type TypeBuyIn = {
  min: number
  max: number
}

type TypeSeat = {
  id: number
  user: TypeUser
}

type TypeCardType = 'diamonds' | 'clubs' | 'spades' | 'hearts'

type TypeCardNumber = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'

type TypeCard = {
  type: TypeCardType
  number: TypeCardNumber
}

type TypeCash = {
  inBank: number
  inGame: number
  inPot: number
}

type TypeUser = {
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

type TypeTableType = 'HOLDEM' | 'OMAHA'

type TypeTablePhase = 'Wait' | 'Preflop' | 'Flop' | 'Turn' | 'River' | 'Show'

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
}
