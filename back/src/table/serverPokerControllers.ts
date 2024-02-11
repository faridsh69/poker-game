import { Server } from 'socket.io'

import { TypeAction, TypeTable } from 'src/utils/serverPokerTypes'
import { ACTIONS, ACTION_NAMES, SERVER_CHANNELS, WAITING_USER } from 'src/utils/serverPokerConstants'
import {
  clearTable,
  getClearTableTimer,
  getIsPhaseFinished2,
  getLeaveSeatTimer,
  getStartTableTimer,
  getTable,
  getUpdatedSeatWithAutoCheck,
  getUpdatedSeatWithFold1,
  getUpdatedSeatWithRaiseOrCallAmount1,
  getUpdatedSeatWithTimeBank,
  getUpdatedTableIfPhaseFinished3,
  getUpdatedTableNextGameTurn4,
  isCheckAllowed,
  isTimeToClearTableInMiddleOfGame,
  isTimeToStartTable,
  isUserSeatedTable,
  isUserWaitingTable,
  resetTable,
} from 'src/table/serverPokerServices'

export const renderClientJoinTable = (tablesState: TypeTable[], tableId: number, username: string): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    // const isWaitingUser = isUserWaitingTable(t, username)
    const isSeatedUser = isUserSeatedTable(t, username)

    return {
      ...t,
      waitingUsers: isSeatedUser
        ? t.waitingUsers
        : [
            ...t.waitingUsers,
            {
              ...WAITING_USER, // NEW_USER
              username,
              // avatar
              // cash inBank
            },
          ],
      seats: t.seats.map(s => {
        if (!s.user) return s
        if (s.user.username !== username) return s

        return {
          ...s,
          user: {
            ...s.user,
            isTableClosed: false,
          },
        }
      }),
    }
  })
}

export const renderClientLeaveTable = (tablesState: TypeTable[], tableId: number, username: string): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return {
      ...t,
      waitingUsers: t.waitingUsers.filter(u => u.username !== username),
      seats: t.seats.map(s => {
        if (!s.user) return s
        if (s.user.username !== username) return s

        return {
          ...s,
          user: {
            ...s.user,
            isTableClosed: true,
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
): TypeTable[] => {
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
                ...WAITING_USER, // NEW_USER
                username,
                // avatar
                // cash inBank
                isSeatout: true,
                timer: getLeaveSeatTimer(false),
              },
            }
          }),
    }
  })
}

export const renderClientLeaveSeat = (tablesState: TypeTable[], tableId: number, username: string): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedTableLeaveSeat = {
      ...t,
      waitingUsers: isUserWaitingTable(t, username)
        ? t.waitingUsers
        : [
            ...t.waitingUsers,
            {
              ...WAITING_USER, // NEW_USER
              username,
              // avatar
              // cash inBank
            },
          ],
      seats: t.seats.map(s => {
        return {
          ...s,
          user: s.user?.username === username ? null : s.user,
        }
      }),
    }

    const timeToClearTableInMiddleOfGame = isTimeToClearTableInMiddleOfGame(updatedTableLeaveSeat)
    console.log('1 timeToClearTableInMiddleOfGame', timeToClearTableInMiddleOfGame)

    return {
      ...updatedTableLeaveSeat,
      timer: timeToClearTableInMiddleOfGame ? getClearTableTimer() : null,
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
): TypeTable[] => {
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
      timer: isTimeToStartTable(updatedTableJoinGame) ? getStartTableTimer() : updatedTableJoinGame.timer,
    }
  })
}

export const renderClientWaitForBB = (tablesState: TypeTable[], tableId: number, username: string): TypeTable[] => {
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
            isWaitForBB: !s.user.isWaitForBB,
          },
        }
      }),
    }
  })
}

export const renderClientLeaveGame = (tablesState: TypeTable[], tableId: number, username: string): TypeTable[] => {
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

export const renderClientFoldAction = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatWithFold = getUpdatedSeatWithFold1(t)
    const isPhaseFinished = getIsPhaseFinished2(updatedSeatWithFold)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished3(updatedSeatWithFold, isPhaseFinished)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn4(updatedTableIfPhaseFinished, isPhaseFinished)

    return updatedTableNextGameTurn
  })
}

export const renderClientCheckAction = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const isPhaseFinished = getIsPhaseFinished2(t)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished3(t, isPhaseFinished)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn4(updatedTableIfPhaseFinished, isPhaseFinished)

    return updatedTableNextGameTurn
  })
}

export const renderServerAutoCheckFold = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  const table = getTable(tablesState, tableId)

  if (isCheckAllowed(table)) {
    return renderClientCheckAction(tablesState, tableId)
  }

  return renderClientFoldAction(tablesState, tableId)
}

export const renderClientCallAction = (tablesState: TypeTable[], tableId: number, callActionAmount?: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatWithAmount = getUpdatedSeatWithRaiseOrCallAmount1(t, callActionAmount as number)
    const isPhaseFinished = getIsPhaseFinished2(t)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished3(updatedSeatWithAmount, isPhaseFinished)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn4(updatedTableIfPhaseFinished, isPhaseFinished)

    return updatedTableNextGameTurn
  })
}

export const renderClientRaiseAction = (tablesState: TypeTable[], tableId: number, raiseActionAmount: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatWithAmount = getUpdatedSeatWithRaiseOrCallAmount1(t, raiseActionAmount)
    const isPhaseFinished = false
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn4(updatedSeatWithAmount, isPhaseFinished)

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
): void => {
  const renderMethod = ACTIONS[action]
  const tablesStateUpdatedAutoAction = renderUpdatedAutoAction(tablesState, tableId, action === ACTION_NAMES.checkfold)
  const tables = renderMethod(tablesStateUpdatedAutoAction, tableId, amount)
  updateTablesState(tables)

  server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    tables,
    lastAction: {
      username,
      action,
      tableId,
      amount,
    },
  })
}

export const renderUpdateClients = (server: Server, tables: TypeTable[], tableId: number): void => {
  server.to('' + tableId).emit(SERVER_CHANNELS.updateTables, {
    tables,
  })
}

export const renderClientTimeBankAction = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return getUpdatedSeatWithTimeBank(t)
  })
}

const renderUpdatedAutoAction = (tablesState: TypeTable[], tableId: number, isAutoCheck: boolean): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return getUpdatedSeatWithAutoCheck(t, isAutoCheck)
  })
}
