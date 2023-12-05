export const isUserSeatedTable = (table, username) => {
  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table, username) => {
  return !!table.waitingUsers.find(u => u.username === username)
}
