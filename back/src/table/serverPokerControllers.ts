import { Server } from 'socket.io'

import { TypeAction, TypeTable } from 'src/utils/serverPokerTypes'
import { ACTIONS, SERVER_CHANNELS, WAITING_USER } from 'src/utils/serverPokerConstants'
import {
  clearTable,
  getClearTableTimer,
  getIsPhaseFinished,
  getLeaveSeatTimer,
  getStartTableTimer,
  getTable,
  getUpdatedSeatWithFold,
  getUpdatedSeatWithRaiseOrCallAmount,
  getUpdatedTableIfPhaseFinishedWithWinners,
  getUpdatedTableNextGameTurn,
  isCheckAllowed,
  isTimeToClearTable,
  isTimeToStartTable,
  isUserSeatedTable,
  isUserWaitingTable,
  resetTable,
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
      timer: isTimeToClearTable(t) ? getClearTableTimer() : null,
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
                isSeatout: true,
                timer: getLeaveSeatTimer(),
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
      timer: isTimeToClearTable(t) ? getClearTableTimer() : null,
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

    const table = {
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

    return {
      ...table,
      timer: isTimeToStartTable(table) ? getStartTableTimer() : null,
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
      timer: isTimeToClearTable(t) ? getClearTableTimer() : null,
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
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinishedWithWinners(
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
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinishedWithWinners(
      t,
      isPhaseFinished,
    )
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
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinishedWithWinners(
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

export const renderServerClearTable = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return clearTable(t)
  })
}

export const renderServerStartTable = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return resetTable(t)
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
