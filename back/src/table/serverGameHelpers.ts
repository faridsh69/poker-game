import { WAITING_USER, PLAYING_USER } from './serverGameConstants'

const isUserSeatedTable = (table, username) => {
  return !!table.seats.find(s => s.user?.username === username)
}

const isUserWaitingTable = (table, username) => {
  return !!table.waitingUsers.find(u => u.username === username)
}

const findUserTables = (allTables, username) => {
  return allTables.filter(t => {
    const isUserSeated = isUserSeatedTable(t, username)
    const isUserWaited = isUserWaitingTable(t, username)

    return isUserSeated || isUserWaited
  })
}

export const renderJoinTable = (tablesState, tableId, username) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers:
            isUserWaitingTable(t, username) || isUserSeatedTable(t, username)
              ? t.waitingUsers
              : [
                  ...t.waitingUsers,
                  {
                    ...WAITING_USER,
                    username,
                  },
                ],
        }
  })
}

export const renderQuitTable = (tablesState, tableId, username) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: t.waitingUsers.filter(u => u.username !== username),
        }
  })
}

export const renderSitUser = (tablesState, tableId, seatId, username) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: t.waitingUsers.filter(u => u.username !== username),
          seats: isUserSeatedTable(t, username)
            ? t.seats
            : t.seats.map(s => {
                return s.id !== seatId
                  ? s
                  : {
                      id: seatId,
                      user: {
                        ...PLAYING_USER,
                        username,
                      },
                    }
              }),
        }
  })
}

export const renderSitoutUser = (tablesState, tableId, username) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: isUserWaitingTable(t, username)
            ? t.waitingUsers
            : [
                ...t.waitingUsers,
                {
                  ...WAITING_USER,
                  username,
                },
              ],
          seats: t.seats.map(s => {
            return {
              ...s,
              user: s.user?.username === username ? null : s.user,
            }
          }),
        }
  })
}
