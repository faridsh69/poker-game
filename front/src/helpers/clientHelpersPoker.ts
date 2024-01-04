import { TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { TypeSeat, TypeTable } from 'src/interfaces/type-game'

export const roundNumber = (number: number, digits: number = 2): number => {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

export const isUserSeatedTable = (table: TypeTable, username: string) => {
  return !!table.seats.find(s => s.user?.username === username && !s.user.isSeatout)
}

export const isUserSeatoutTable = (table: TypeTable, username: string) => {
  return !!table.seats.find(s => s.user?.username === username && s.user.isSeatout)
}

export const isUserWaitingTable = (table: TypeTable, username: string) => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const findUserTables = (allTables: TypeTable[], username: string): TypeTable[] => {
  return allTables.filter(t => {
    const isUserSeated = isUserSeatedTable(t, username) || isUserSeatoutTable(t, username)
    const isUserWaited = isUserWaitingTable(t, username)

    return isUserSeated || isUserWaited
  })
}

export const isAuthUserGameTurn = (table: TypeTable, username: string) => {
  return !!table.seats.find(s => s.user?.gameTurn && s.user?.username === username)
}

const getMaximumBet = (table: TypeTable) => {
  let maximumBet = 0
  for (const seat of table.seats) {
    if (!seat.user) continue

    if (seat.user.cash.inPot > maximumBet) {
      maximumBet = seat.user.cash.inPot
    }
  }

  return maximumBet
}

const getPrevMaximumBet = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  let prevMaximumBet = 0
  for (const seat of table.seats) {
    if (!seat.user) continue
    if (maximumBet === seat.user.cash.inPot) continue

    if (seat.user.cash.inPot > prevMaximumBet) {
      prevMaximumBet = seat.user.cash.inPot
    }
  }

  return prevMaximumBet
}

export const isAuthSeat = (seat: TypeSeat, username: string) => seat.user?.username === username

export const isShowPhase = (table: TypeTable) => table.phase === TABLE_PHASES.show

export const getCallActionAmount = (table: TypeTable, username: string) => {
  const maximumBet = getMaximumBet(table)
  const userSeat = table.seats.find(s => s.user?.username === username)

  if (!userSeat) return 1001

  const callActionAmount = maximumBet - userSeat.user.cash.inPot

  return callActionAmount
}

export const getMinimumRaiseAmount = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  const prevMaximumBet = getPrevMaximumBet(table)

  return 2 * maximumBet - prevMaximumBet
}

export const getStepRaiseAmount = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  const prevMaximumBet = getPrevMaximumBet(table)

  return maximumBet - prevMaximumBet
}

export const getMaximumRaiseAmount = (table: TypeTable, username: string): number => {
  const userSeat = table.seats.find(s => s.user?.username === username)

  if (!userSeat) return 0

  const maximumRaise = userSeat.user.cash.inGame - userSeat.user.cash.inPot

  return roundNumber(maximumRaise)
}
