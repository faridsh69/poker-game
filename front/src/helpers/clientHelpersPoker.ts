import { TypeTable } from 'src/interfaces/type-game'

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

export const getCallActionAmount = (table: TypeTable, username: string) => {
  const maximumBet = getMaximumBet(table)
  const userSeat = table.seats.find(s => s.user?.username === username)

  if (!userSeat) return 1001

  return maximumBet - userSeat.user.cash.inPot
}
