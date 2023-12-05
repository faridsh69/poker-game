export const isUserSeatedTable = (table, username) => {
  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table, username) => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const findUserTables = (allTables, username) => {
  return allTables.filter(t => {
    const isUserSeated = isUserSeatedTable(t, username)
    const isUserWaited = isUserWaitingTable(t, username)

    return isUserSeated || isUserWaited
  })
}
