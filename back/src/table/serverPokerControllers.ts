import { Server } from 'socket.io'

import { TypeAction, TypeTable } from 'src/utils/serverPokerTypes'
import {
  ACTIONS,
  ACTION_NAMES,
  SERVER_CHANNELS,
  WAITING_USER,
} from 'src/utils/serverPokerConstants'
import {
  clearTable,
  getClearTableTimer,
  getIsPhaseFinished,
  getLeaveSeatTimer,
  getStartTableTimer,
  getTable,
  getUpdatedSeatWithFold,
  getUpdatedSeatWithRaiseOrCallAmount,
  getUpdatedSeatWithTimeBank,
  getUpdatedTableIfPhaseFinished,
  getUpdatedTableNextGameTurn,
  isCheckAllowed,
  isTimeToClearTableInMiddleOfGame,
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

    const updatedTableLeaveTable = {
      ...t,
      waitingUsers: t.waitingUsers.filter(u => u.username !== username),
      seats: t.seats.map(s => {
        if (!s.user) return s
        if (s.user.username !== username) return s

        return {
          ...s,
          user: null,
        }
      }),
    }

    const isTimeToClearTable = isTimeToClearTableInMiddleOfGame(updatedTableLeaveTable)

    // @TODO if its user game turn then gather his pot to table pot
    // MOVE user.cash.pot to seat.pot from user
    // Also go for next turn
    // Also update role turn of table
    return {
      ...updatedTableLeaveTable,
      timer: isTimeToClearTable ? getClearTableTimer() : updatedTableLeaveTable.timer,
      seats: updatedTableLeaveTable.seats.map(s => {
        if (!s.user) return s

        return {
          ...s,
          user: {
            ...s.user,
            timer: s.user.timer?.action === ACTION_NAMES.checkfold ? null : s.user.timer,
          },
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
              role: null,
              user: {
                ...WAITING_USER,
                username,
                isSeatout: true,
                timer: getLeaveSeatTimer(false),
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

    const updatedTableLeaveSeat = {
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

    return {
      ...updatedTableLeaveSeat,
      timer: isTimeToClearTableInMiddleOfGame(updatedTableLeaveSeat) ? getClearTableTimer() : null,
      seats: updatedTableLeaveSeat.seats.map(s => {
        if (!s.user) return s

        return {
          ...s,
          user: {
            ...s.user,
            timer: s.user.timer?.action === ACTION_NAMES.checkfold ? null : s.user.timer,
          },
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

    const updatedTableJoinGame = {
      ...t,
      seats: t.seats.map(s => {
        if (s.user?.username !== username) return s

        return {
          ...s,
          user: {
            ...s.user,
            cash: {
              inGame: buyinAmount,
              inBank: WAITING_USER.cash.inBank - buyinAmount,
              inPot: 0,
            },
            isSeatout: false,
            timer: null,
          },
        }
      }),
    }

    return {
      ...updatedTableJoinGame,
      timer: isTimeToStartTable(updatedTableJoinGame)
        ? getStartTableTimer()
        : updatedTableJoinGame.timer,
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

    const updatedTableLeaveGame = {
      ...t,
      seats: t.seats.map(s => {
        const user =
          s.user?.username !== username
            ? s.user
            : {
                ...s.user,
                isSeatout: true,
                timer: getLeaveSeatTimer(true),
              }

        return {
          ...s,
          user,
        }
      }),
    }

    return {
      ...updatedTableLeaveGame,
      timer: isTimeToClearTableInMiddleOfGame(updatedTableLeaveGame) ? getClearTableTimer() : null,
      seats: updatedTableLeaveGame.seats.map(s => {
        if (!s.user) return s

        return {
          ...s,
          user: {
            ...s.user,
            timer: s.user.timer?.action === ACTION_NAMES.checkfold ? null : s.user.timer,
          },
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
  // @TODO active seat out next hand

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

export const renderClientTimeBankAction = (tablesState: TypeTable[], tableId: number) => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return getUpdatedSeatWithTimeBank(t)
  })
}
