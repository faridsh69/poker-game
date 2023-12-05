import { WAITING_USER, PLAYING_USER } from './constants'

export const renderJoinTable = (tablesState, tableId, username) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: [
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
          waitingUsers: t.waitingUsers.filter(wu => wu.username !== username),
          seats: t.seats.find(s => s.user?.username === username)
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
          waitingUsers: [
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
