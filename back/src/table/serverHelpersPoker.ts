import { TypeScoreAndAchivements, TypeTable, TypeTablePhase } from 'src/utils/types'
import { TABLE_PHASES, WAITING_USER } from 'src/table/serverConstantsPoker'
import {
  getCurrentDealerSeatId,
  getCurrentGameTurnSeatId,
  getIsPhaseFinished,
  getNextSeatId,
  getNextTablePhase,
  getRandomCards,
  getScoreAndAchievements,
  getWinnerSeatIds,
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
          seats: t.seats.map(s => {
            return {
              ...s,
              user: s.user?.username === username ? null : s.user,
            }
          }),
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

    // @todo check if user is not able to do check action
    const currentGameTurnSeatId = getCurrentGameTurnSeatId(t, username)
    const nextGameTurnSeatId = getNextSeatId(t, currentGameTurnSeatId)

    const isPhaseFinished = getIsPhaseFinished(t)

    let tablePhase = t.phase
    let scoreAndAchievements: TypeScoreAndAchivements = {}
    let winnerSeatIds: number[] = []

    if (isPhaseFinished) {
      tablePhase = getNextTablePhase(t.phase)

      // if (tablePhase === TABLE_PHASES.show) {
      if (tablePhase) {
        scoreAndAchievements = getScoreAndAchievements(t)
        winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
      }
    }

    return {
      ...t,
      phase: tablePhase,
      seats: t.seats.map(s => {
        if (!s.user) return s

        return {
          ...s,
          user: {
            ...s.user,
            gameTurn: nextGameTurnSeatId === s.id,
            isWinner: winnerSeatIds.includes(s.id),
            achievement: scoreAndAchievements[s.id]?.achievement,
          },
        }
      }),
    }
  })
}

export const renderClientCallAction = (
  tablesState: TypeTable[],
  tableId: number,
  callActionAmount: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId || t.seats.filter(s => s.user).length < 2) return t

    // @todo check if user is not able to do call that amount and he should call more
    const currentGameTurnSeatId = getCurrentGameTurnSeatId(t, username)
    const nextGameTurnSeatId = getNextSeatId(t, currentGameTurnSeatId)

    const isPhaseFinished = getIsPhaseFinished(t)

    let tablePhase = t.phase
    let scoreAndAchievements: TypeScoreAndAchivements = {}
    let winnerSeatIds: number[] = []

    if (isPhaseFinished) {
      tablePhase = getNextTablePhase(t.phase)

      if (tablePhase === TABLE_PHASES.show) {
        scoreAndAchievements = getScoreAndAchievements(t)
        winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
      }
    }

    return {
      ...t,
      phase: tablePhase,
      seats: t.seats.map(s => {
        if (!s.user) return s

        const addedToPot = currentGameTurnSeatId === s.id ? callActionAmount : 0
        const inPot = s.user.cash.inPot + addedToPot
        const inGame = s.user.cash.inGame - addedToPot

        return {
          ...s,
          user: {
            ...s.user,
            gameTurn: nextGameTurnSeatId === s.id,
            cash: {
              ...s.user.cash,
              inPot,
              inGame,
            },
            isWinner: winnerSeatIds.includes(s.id),
            achievement: scoreAndAchievements[s.id]?.achievement,
          },
        }
      }),
    }
  })
}

export const renderClientRaiseAction = (
  tablesState: TypeTable[],
  tableId: number,
  raiseActionAmount: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId || t.seats.filter(s => s.user).length < 2) return t

    // @todo check the raise amount is allowed and equal to last bet
    const currentGameTurnSeatId = getCurrentGameTurnSeatId(t, username)
    const nextGameTurnSeatId = getNextSeatId(t, currentGameTurnSeatId)

    return {
      ...t,
      seats: t.seats.map(s => {
        if (!s.user) return s

        const addedToPot = currentGameTurnSeatId === s.id ? raiseActionAmount : 0
        const inPot = s.user.cash.inPot + addedToPot
        const inGame = s.user.cash.inGame - addedToPot

        return {
          ...s,
          user: {
            ...s.user,
            gameTurn: nextGameTurnSeatId === s.id,
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

export const renderStartTable = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId || t.seats.filter(s => s.user).length < 2) return t

    const tableCards = getRandomCards(5, [])
    let usedCards = [...tableCards]

    const currentDealerSeatId = getCurrentDealerSeatId(t)
    const newDealerSeatId = getNextSeatId(t, currentDealerSeatId)
    const newSmallSeatId = getNextSeatId(t, newDealerSeatId)
    const newBigSeatId = getNextSeatId(t, newSmallSeatId)
    const newGameTurnSeatId = getNextSeatId(t, newBigSeatId)

    return {
      ...t,
      phase: TABLE_PHASES.preflop as TypeTablePhase,
      cards: tableCards,
      seats: t.seats.map(s => {
        if (!s.user) return s

        const userCards = getRandomCards(2, usedCards)
        usedCards = [...usedCards, ...userCards]

        const addedToPot = newSmallSeatId === s.id ? t.small : newBigSeatId === s.id ? t.big : 0
        const inPot = addedToPot
        const inGame = s.user.cash.inGame - addedToPot

        return {
          ...s,
          user: {
            ...s.user,
            cards: userCards,
            isDealer: newDealerSeatId === s.id,
            gameTurn: newGameTurnSeatId === s.id,
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
