import { Server } from 'socket.io'

import { TypeAction, TypeTable } from 'src/utils/serverPokerTypes'
import {
  ACTIONS,
  SERVER_CHANNELS,
  SERVER_TIMEOUT_ACTION,
  SERVER_TIMEOUT_SEATOUT,
  TABLE_PHASES,
  TIMER_ACTION_NAMES,
  WAITING_USER,
} from 'src/utils/serverPokerConstants'
import {
  clearTable,
  getCurrentDealerSeatId,
  getDeadline,
  getIsPhaseFinished,
  getNextSeatId,
  getRandomCards,
  getTable,
  getUpdatedSeatWithFold,
  getUpdatedSeatWithRaiseOrCallAmount,
  getUpdatedTableIfPhaseFinished,
  getUpdatedTableNextGameTurn,
  isCheckAllowed,

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
                timer: {
                  deadline: getDeadline(SERVER_TIMEOUT_SEATOUT),
                  action: TIMER_ACTION_NAMES.leaveSeat,
                },
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
            timer: null,
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

    const updatedSeatWithFold = getUpdatedSeatWithFold(t)
    const isPhaseFinished = getIsPhaseFinished(updatedSeatWithFold)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished(
      updatedSeatWithFold,
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

export const renderServerAutoCheckFold = (
  tablesState: TypeTable[],
  tableId: number,
): TypeTable[] => {
  const table = getTable(tablesState, tableId)

  if (isCheckAllowed(table)) {
    return renderClientCheckAction(tablesState, tableId)
  }

  return renderClientFoldAction(tablesState, tableId)
}

export const renderClientCallAction = (
  tablesState: TypeTable[],
  tableId: number,
  callActionAmount?: number,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatWithAmount = getUpdatedSeatWithRaiseOrCallAmount(t, callActionAmount as number)
    const isPhaseFinished = getIsPhaseFinished(t)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished(
      updatedSeatWithAmount,
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
  raiseActionAmount?: number,
) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatWithAmount = getUpdatedSeatWithRaiseOrCallAmount(
      t,
      raiseActionAmount as number,
    )
    const isPhaseFinished = false
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn(
      updatedSeatWithAmount,
      isPhaseFinished,
    )

    return updatedTableNextGameTurn
  })
}

export const renderServerStartTable = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    // if (isShowOrFinishPhase(t)) {
    // }

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
            timer:
              newGameTurnSeatId === s.id
                ? {
                    deadline: getDeadline(SERVER_TIMEOUT_ACTION),
                    action: TIMER_ACTION_NAMES.checkfold,
                  }
                : s.user.timer?.action === TIMER_ACTION_NAMES.leaveSeat
                ? s.user.timer
                : null,
          },
        }
      }),
    }
  })
}

export const renderGeneralClientActions = (
  server: Server,
  tablesState: TypeTable[],
  updateTablesState: (tables: TypeTable[]) => void,
  tableId: number,
  username: string,
  action: TypeAction,
  amount?: number,
) => {
  const renderMethod = ACTIONS[action]
  tablesState = renderMethod(tablesState, tableId, amount)
  updateTablesState(tablesState)

  server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    tables: tablesState,
    lastAction: {
      username,
      action,
      tableId,
      amount,
    },
  })
}

export const renderUpdateClients = (server: Server, tables: TypeTable[], tableId: number) => {
  server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    tables,
  })
}
