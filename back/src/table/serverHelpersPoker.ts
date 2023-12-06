import { TypeTable } from 'src/utils/types'
import { TABLE_PHASES, WAITING_USER } from './serverConstantsPoker'
import {
  getCurrentGameTurnSeatId,
  getNewDealerSeatId,
  getNextSeatId,
  getRandomCards,
} from 'src/utils/common'

const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  return !!table.seats.find(s => s.user?.username === username)
}

const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const renderClientJoinTable = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
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

export const renderClientQuitTable = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
  return tablesState.map(t => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: t.waitingUsers.filter(u => u.username !== username),
        }
  })
}

export const renderClientSitTable = (
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

export const renderClientSitoutTable = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
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

export const renderClientCheckAction = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId || t.seats.filter(s => s.user).length < 2) return t

    const currentGameTurnSeatId = getCurrentGameTurnSeatId(t, username)
    const gameTurnSeatId = getNextSeatId(t, currentGameTurnSeatId)

    return {
      ...t,
      seats: t.seats.map(s => {
        if (!s.user) return s

        return {
          ...s,
          user: {
            ...s.user,
            gameTurn: gameTurnSeatId === s.id,
          },
        }
      }),
    }
  })
}

export const renderStartTable = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId || t.seats.filter(s => s.user).length < 2) return t

    const tableCards = getRandomCards(5, [])
    let usedCards = [...tableCards]

    const newDealerSeatId = getNewDealerSeatId(t)
    const smallSeatId = getNextSeatId(t, newDealerSeatId)
    const bigSeatId = getNextSeatId(t, smallSeatId)
    const gameTurnSeatId = getNextSeatId(t, bigSeatId)

    return {
      ...t,
      phase: TABLE_PHASES.preflop,
      cards: tableCards,
      seats: t.seats.map(s => {
        if (!s.user) return s

        const userCards = getRandomCards(2, usedCards)
        usedCards = [...usedCards, ...userCards]
        const inPot = smallSeatId === s.id ? t.small : bigSeatId === s.id ? t.big : 0
        const inGame = s.user.cash.inGame - inPot

        return {
          ...s,
          user: {
            ...s.user,
            cards: userCards,
            isDealer: newDealerSeatId === s.id,
            gameTurn: gameTurnSeatId === s.id,
            cash: {
              ...s.user.cash,
              inPot,
              inGame,
            },
          },
        }
      }),
    }
  })
}
