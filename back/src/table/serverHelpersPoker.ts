import { TypeTable } from 'src/utils/types'
import { CARD_NUMBERS, CARD_TYPES, TABLE_PHASES, WAITING_USER } from './serverConstantsPoker'

const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  return !!table.seats.find(s => s.user?.username === username)
}

const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const renderJoinTable = (tablesState: TypeTable[], tableId: number, username: string) => {
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

export const renderQuitTable = (tablesState: TypeTable[], tableId: number, username: string) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: t.waitingUsers.filter(u => u.username !== username),
        }
  })
}

export const renderSitUser = (
  tablesState: TypeTable[],
  tableId: number,
  seatId: number,
  buyinAmount: number,
  username: string,
) => {
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
                        ...WAITING_USER,
                        username,
                        cash: {
                          inBank: WAITING_USER.cash.inBank - buyinAmount,
                          inPot: 0,
                          inGame: buyinAmount,
                        },
                      },
                    }
              }),
        }
  })
}

export const renderSitoutUser = (tablesState: TypeTable[], tableId: number, username: string) => {
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

export const renderStartTable = (tablesState: TypeTable[], tableId: number) => {
  return tablesState.map(t => {
    if (t.id !== tableId || t.seats.filter(s => s.user).length < 2) return t

    return {
      ...t,
      phase: TABLE_PHASES.preflop,
      cards: [],
      seats: t.seats.map(s => {
        if (!s.user) return s

        return {
          ...s.user,
          cards: [
            { type: CARD_TYPES.clubs, number: CARD_NUMBERS.seven },
            { type: CARD_TYPES.clubs, number: CARD_NUMBERS.eight },
          ],
          isDealer: false,
        }
      }),
    }
  })
}
