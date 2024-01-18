import { Server } from 'socket.io'

import { TypeLastAction, TypeTable } from 'src/utils/serverPokerTypes'
import {
  SERVER_CHANNELS,
  START_NEW_ROUND_TIMEOUT,
  TABLE_PHASES,
  USER_ACTION_THINKING_TIMEOUT_MILISECONDS,
  WAITING_USER,
} from 'src/utils/serverPokerConstants'
import {
  clearTable,
  getCurrentDealerSeatId,
  getIsPhaseFinished,
  getNextSeatId,
  getRandomCards,
  getTable,
  getUpdatedSeatWithFold,
  getUpdatedSeatWithRaiseOrCallAmount,
  getUpdatedTableIfPhaseFinished,
  getUpdatedTableNextGameTurn,
  isCheckAllowed,
  isShowOrFinishPhase,

  // isGameHeadsUp,
  isTimeToStartTable,
  isUserSeatedTable,
  isUserWaitingTable,
  roundNumber,
} from 'src/table/serverPokerServices'

export const renderClientJoinTable = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return {
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

export const renderClientLeaveTable = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return {
      ...t,
      waitingUsers: t.waitingUsers.filter(u => u.username !== username),
      seats: t.seats.map(s => {
        return {
          ...s,
          user: s.user?.username === username ? null : s.user,
        }
      }),
    }

    // const updatedSeatsWithFold = getUpdatedSeatWithFold(t)
    // const isPhaseFinished = getIsPhaseFinished(updatedSeatsWithFold)
    // const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished(
    //   updatedSeatsWithFold,
    //   isPhaseFinished,
    // )
    // const updatedTableNextGameTurn = getUpdatedTableNextGameTurn(
    //   updatedTableIfPhaseFinished,
    //   isPhaseFinished,
    // )
  })
}

export const renderClientJoinSeat = (
  tablesState: TypeTable[],
  tableId: number,
  seatId: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return {
      ...t,
      waitingUsers: t.waitingUsers.filter(u => u.username !== username),
      seats: isUserSeatedTable(t, username)
        ? t.seats
        : t.seats.map(s => {
            if (s.id !== seatId) return s

            return {
              id: s.id,
              user: {
                ...WAITING_USER,
                username,
              },
            }
          }),
    }
  })
}

export const renderClientLeaveSeat = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return {
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

export const renderClientJoinGame = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
  buyinAmount: number,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return {
      ...t,
      seats: t.seats.map(s => {
        if (s.user?.username !== username) return s

        return {
          ...s,
          user: {
            ...s.user,
            isSeatout: false,
            cash: {
              inGame: buyinAmount,
              inBank: WAITING_USER.cash.inBank - buyinAmount,
              inPot: 0,
            },
          },
        }
      }),
    }
  })
}

export const renderClientLeaveGame = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return {
      ...t,
      seats: t.seats.map(s => {
        const user =
          s.user?.username !== username
            ? s.user
            : {
                ...s.user,
                isSeatout: true,
              }

        return {
          ...s,
          user,
        }
      }),
    }
  })
}

export const renderClientFoldAction = (tablesState: TypeTable[], tableId: number) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatsWithFold = getUpdatedSeatWithFold(t)

    const isPhaseFinished = getIsPhaseFinished(updatedSeatsWithFold)

    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished(
      updatedSeatsWithFold,
      isPhaseFinished,
    )

    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn(
      updatedTableIfPhaseFinished,
      isPhaseFinished,
    )

    return updatedTableNextGameTurn
  })
}

export const renderClientCheckAction = (tablesState: TypeTable[], tableId: number) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const isPhaseFinished = getIsPhaseFinished(t)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished(t, isPhaseFinished)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn(
      updatedTableIfPhaseFinished,
      isPhaseFinished,
    )

    return updatedTableNextGameTurn
  })
}

export const renderClientCallAction = (
  tablesState: TypeTable[],
  tableId: number,
  callActionAmount: number,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatsWithAmount = getUpdatedSeatWithRaiseOrCallAmount(t, callActionAmount)
    const isPhaseFinished = getIsPhaseFinished(t)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished(
      updatedSeatsWithAmount,
      isPhaseFinished,
    )
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn(
      updatedTableIfPhaseFinished,
      isPhaseFinished,
    )

    return updatedTableNextGameTurn
  })
}

export const renderClientRaiseAction = (
  tablesState: TypeTable[],
  tableId: number,
  raiseActionAmount: number,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatsWithAmount = getUpdatedSeatWithRaiseOrCallAmount(t, raiseActionAmount)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn(updatedSeatsWithAmount, false)

    return updatedTableNextGameTurn
  })
}

export const renderServerStartTable = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    if (!isTimeToStartTable(t)) {
      return clearTable(t)
    }

    const tableCards = getRandomCards(5, [])
    let usedCards = [...tableCards]

    const currentDealerSeatId = getCurrentDealerSeatId(t)
    const newDealerSeatId = getNextSeatId(t, currentDealerSeatId, true)
    // const newSmallSeatId = isGameHeadsUp(t) ? newDealerSeatId : getNextSeatId(t, newDealerSeatId)
    const newSmallSeatId = getNextSeatId(t, newDealerSeatId, true)
    const newBigSeatId = getNextSeatId(t, newSmallSeatId, true)
    const newGameTurnSeatId = getNextSeatId(t, newBigSeatId, true)

    return {
      ...t,
      phase: TABLE_PHASES.preflop,
      pot: 0,
      total: t.blinds.small + t.blinds.big,
      cards: tableCards,
      seats: t.seats.map(s => {
        if (!s.user || s.user.isSeatout) return s

        const userCards = getRandomCards(2, usedCards)
        usedCards = [...usedCards, ...userCards]

        const addedToPot =
          newSmallSeatId === s.id ? t.blinds.small : newBigSeatId === s.id ? t.blinds.big : 0
        const inPot = addedToPot
        const inGame = roundNumber(s.user.cash.inGame - addedToPot)

        return {
          ...s,
          user: {
            ...s.user,
            cards: userCards,
            isDealer: newDealerSeatId === s.id,
            gameTurn: newGameTurnSeatId === s.id,
            isWinner: false,
            isFold: false,
            achievement: '',
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

export const renderServerAutoCheckFold = (
  tablesState: TypeTable[],
  tableId: number,
): TypeTable[] => {
  const table = tablesState.find(t => t.id === tableId)

  if (isCheckAllowed(table)) {
    return renderClientCheckAction(tablesState, tableId)
  }

  return renderClientFoldAction(tablesState, tableId)
}

export const renderGeneralClientActions = (
  server: Server,
  tablesState: TypeTable[],
  updateTablesState: (tables: TypeTable[]) => void,
  tableTimeouts: object,
  tableId: number,
  message: string,
  lastAction: TypeLastAction,
  username: string,
) => {
  clearTimeout(tableTimeouts[tableId])

  server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    message,
    tables: tablesState,
    lastAction,
  })

  const table = getTable(tablesState, tableId)
  if (isShowOrFinishPhase(table)) {
    setTimeout(() => {
      tablesState = renderServerStartTable(tablesState, tableId)
      updateTablesState(tablesState)
      server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
        tables: tablesState,
      })
    }, START_NEW_ROUND_TIMEOUT)

    return
  }

  const timeout = setTimeout(() => {
    tablesState = renderServerAutoCheckFold(tablesState, tableId)
    updateTablesState(tablesState)

    renderGeneralClientActions(
      server,
      tablesState,
      updateTablesState,
      tableTimeouts,
      tableId,
      null,
      null,
      username,
    )
  }, USER_ACTION_THINKING_TIMEOUT_MILISECONDS)

  tableTimeouts[tableId] = timeout
}
