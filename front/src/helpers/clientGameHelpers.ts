import { TypeTable } from 'src/interfaces/type-game'

export const isUserSeatedTable = (table: TypeTable, username: string) => {
  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table: TypeTable, username: string) => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const findUserTables = (allTables: TypeTable[], username: string): TypeTable[] => {
  return allTables.filter(t => {
    const isUserSeated = isUserSeatedTable(t, username)
    const isUserWaited = isUserWaitingTable(t, username)

    return isUserSeated || isUserWaited
  })
}
