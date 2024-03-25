import { Server } from 'socket.io'

import { TypeAction, TypeTable } from 'src/interfaces/serverPokerTypes'
import { ACTION_NAMES, SERVER_CHANNELS, NEW_USER } from 'src/configs/serverPokerConstants'
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
  getUpdatedSeatWithSeatoutNextRound,
  getUpdatedSeatWithShowCards,
  getUpdatedSeatWithStradle,
  getUpdatedSeatWithTimeBank,
  getUpdatedTableIfPhaseFinished3,
  getUpdatedTableNextGameTurn4,
  isCheckAllowed,
  isFlopPhase,
  isPreflopPhase,
  isRiverPhase,
  isSeatoutSeat,
  isShowOrFinishPhase,
  isTimeToClearTableInMiddleOfGame,
  isTimeToStartTable,
  isTurnPhase,
  isUserSeatedTable,
  isUserWaitingTable,
  isWaitPhase,
  resetTable,
} from 'src/services/poker.service'

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
              ...NEW_USER,
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

        if (isSeatoutSeat(s) || isWaitPhase(t)) {
          return {
            ...s,
            user: null,
          }
        }

        if (isShowOrFinishPhase(t)) {
          return {
            ...s,
            user: {
              ...s.user,
              isTableClosed: true,
              isSeatout: true,
              timer: getLeaveSeatTimer(false),
            },
          }
        }

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
                ...NEW_USER,
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
              ...NEW_USER,
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

    return {
      ...updatedTableLeaveSeat,
      timer: timeToClearTableInMiddleOfGame ? getClearTableTimer() : null,
      seats: updatedTableLeaveSeat.seats.map(s => {
        if (!s.user) return s

        if (isPreflopPhase(updatedTableLeaveSeat)) return s
        if (isFlopPhase(updatedTableLeaveSeat)) return s
        if (isTurnPhase(updatedTableLeaveSeat)) return s
        if (isRiverPhase(updatedTableLeaveSeat)) return s

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
              // @todo change this wih real user data
              inBank: NEW_USER.cash.inBank - buyinAmount,
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

const renderClientFoldAction = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatWithFold = getUpdatedSeatWithFold1(t)
    const isPhaseFinished = getIsPhaseFinished2(updatedSeatWithFold)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished3(updatedSeatWithFold, isPhaseFinished)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn4(updatedTableIfPhaseFinished, isPhaseFinished)

    return updatedTableNextGameTurn
  })
}

const renderClientCheckAction = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const isPhaseFinished = getIsPhaseFinished2(t)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished3(t, isPhaseFinished)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn4(updatedTableIfPhaseFinished, isPhaseFinished)

    return updatedTableNextGameTurn
  })
}

const renderServerAutoCheckFold = (tablesState: TypeTable[], tableId: number): TypeTable[] => {
  const table = getTable(tablesState, tableId)

  if (isCheckAllowed(table)) {
    return renderClientCheckAction(tablesState, tableId)
  }

  return renderClientFoldAction(tablesState, tableId)
}

const renderClientCallAction = (tablesState: TypeTable[], tableId: number, callActionAmount?: number): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    const updatedSeatWithAmount = getUpdatedSeatWithRaiseOrCallAmount1(t, callActionAmount as number)
    const isPhaseFinished = getIsPhaseFinished2(t)
    const updatedTableIfPhaseFinished = getUpdatedTableIfPhaseFinished3(updatedSeatWithAmount, isPhaseFinished)
    const updatedTableNextGameTurn = getUpdatedTableNextGameTurn4(updatedTableIfPhaseFinished, isPhaseFinished)

    return updatedTableNextGameTurn
  })
}

const renderClientRaiseAction = (tablesState: TypeTable[], tableId: number, raiseActionAmount: number): TypeTable[] => {
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
  const ACTIONS: {
    [key in TypeAction]: (tablesState: TypeTable[], tableId: number, amount?: number) => TypeTable[]
  } = {
    fold: renderClientFoldAction,
    check: renderClientCheckAction,
    checkfold: renderServerAutoCheckFold,
    call: renderClientCallAction,
    // @ts-ignore
    raise: renderClientRaiseAction,
  }

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

export const renderClientShowCardAction = (
  tablesState: TypeTable[],
  tableId: number,
  username: string,
  cardIndexes: number[],
): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return getUpdatedSeatWithShowCards(t, username, cardIndexes)
  })
}

export const renderClientStradle = (tablesState: TypeTable[], tableId: number, username: string): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return getUpdatedSeatWithStradle(t, username)
  })
}

export const renderClientSeatoutNextRound = (tablesState: TypeTable[], tableId: number, username: string): TypeTable[] => {
  return tablesState.map(t => {
    if (t.id !== tableId) return t

    return getUpdatedSeatWithSeatoutNextRound(t, username)
  })
}
