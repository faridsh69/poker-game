import { LAST_ACTION_ACTIONS, TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { TypeRaiseLimits, TypeSeat, TypeTable } from 'src/interfaces/type-game'
import { capitalize } from './common'

export const renderNumber = (value: string) => {
  return isNaN(+value) ? 0 : +value
}

export const roundNumber = (number: number, digits = 2): number => {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

export const getDeadline = (timeout = 0) => {
  return Math.floor(new Date().valueOf() / 1000) + timeout
}

export const isAuthSeat = (seat: TypeSeat, username: string) => seat.user?.username === username

export const isFoldSeat = (seat: TypeSeat) => seat.user?.isFold

export const isWaitPhase = (table: TypeTable) => table.phase === TABLE_PHASES.wait

export const isPreflopPhase = (table: TypeTable) => table.phase === TABLE_PHASES.preflop

export const isFlopPhase = (table: TypeTable) => table.phase === TABLE_PHASES.flop

export const isTurnPhase = (table: TypeTable) => table.phase === TABLE_PHASES.turn

export const isShowPhase = (table: TypeTable) => table.phase === TABLE_PHASES.show

export const isFinishPhase = (table: TypeTable) => table.phase === TABLE_PHASES.finish

export const getUserSeat = (table: TypeTable, username: string): TypeSeat => {
  return table.seats.find(s => s.user?.username === username) as TypeSeat
}

export const isUserSeatedTable = (table: TypeTable, username: string) => {
  return !!table.seats.find(s => s.user?.username === username && !s.user.isSeatout)
}

export const isUserSeatoutTable = (table: TypeTable, username: string) => {
  return !!table.seats.find(s => s.user?.username === username && s.user.isSeatout)
}

export const isUserHasCashInGame = (table: TypeTable, username: string) => {
  return !table.seats.find(s => s.user?.username === username && s.user.cash.inGame === 0)
}

export const isUserFold = (table: TypeTable, username: string) => {
  return !table.seats.find(s => s.user?.username === username && !s.user.isFold)
}

export const isUserWaitingTable = (table: TypeTable, username: string) => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const isUserGameTurn = (table: TypeTable, username: string) => {
  return !!table.seats.find(s => s.user?.gameTurn && s.user?.username === username)
}

export const isAtLeastTwoNotSeatOutPlayers = (table: TypeTable): boolean => {
  const seats = table.seats.filter(s => s.user && !s.user.isSeatout)

  return seats.length > 1
}

export const isTimeToStartTable = (table: TypeTable): boolean => {
  const isWaitingOrShowPhase = isWaitPhase(table) || isShowPhase(table) || isFinishPhase(table)
  const atLeastTwoPlayers = isAtLeastTwoNotSeatOutPlayers(table)

  return isWaitingOrShowPhase && atLeastTwoPlayers
}

export const findUserTables = (allTables: TypeTable[], username: string): TypeTable[] => {
  return allTables.filter(t => {
    const isUserSeated = isUserSeatedTable(t, username) || isUserSeatoutTable(t, username)
    const isUserWaited = isUserWaitingTable(t, username)

    return isUserSeated || isUserWaited
  })
}

export const showBackcard = (seat: TypeSeat, username: string, isShowPhase: boolean) => {
  return !isAuthSeat(seat, username) && !!seat.user.cards.length && !isShowPhase
}

const getMaximumBet = (table: TypeTable) => {
  let maximumBet = 0
  for (const seat of table.seats) {
    if (!seat.user) continue

    if (seat.user.cash.inPot > maximumBet) {
      maximumBet = seat.user.cash.inPot
    }
  }

  return maximumBet
}

const getPrevMaximumBet = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  let prevMaximumBet = 0
  for (const seat of table.seats) {
    if (!seat.user) continue
    if (maximumBet === seat.user.cash.inPot) continue
    if (table.blinds.small === seat.user.cash.inPot) continue

    if (seat.user.cash.inPot > prevMaximumBet) {
      prevMaximumBet = seat.user.cash.inPot
    }
  }

  return prevMaximumBet
}

export const getCallActionAmount = (table: TypeTable, username: string) => {
  const maximumBet = getMaximumBet(table)
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return -1

  const callActionAmount = maximumBet - userSeat.user.cash.inPot

  return Math.min(callActionAmount, userSeat.user.cash.inGame)
}

export const getMinimumRaiseAmount = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  const prevMaximumBet = getPrevMaximumBet(table)
  const minimumRaise = 2 * maximumBet - prevMaximumBet

  return Math.max(table.blinds.big, minimumRaise)
}

export const getStepRaiseAmount = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  const prevMaximumBet = getPrevMaximumBet(table)
  const stepRaise = maximumBet - prevMaximumBet

  return Math.max(table.blinds.big, stepRaise)
}

export const getMaximumRaiseAmount = (table: TypeTable, username: string): number => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return -1

  return userSeat.user.cash.inGame + userSeat.user.cash.inPot
}

export const getRaiseLimits = (table: TypeTable, username: string): TypeRaiseLimits => {
  const min = getMinimumRaiseAmount(table)
  const step = getStepRaiseAmount(table)
  const max = getMaximumRaiseAmount(table, username)

  return {
    min: Math.min(min, max),
    step,
    max,
  }
}

export const getRaiseActionAmount = (table: TypeTable, username: string, raise: number) => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return -1

  const raiseActionAmount = roundNumber(raise - userSeat.user.cash.inPot)

  return raiseActionAmount
}

export const checkIfLastActionIsAllIn = (action: string, seat: TypeSeat) => {
  if (seat.user.cash.inGame === 0) {
    return LAST_ACTION_ACTIONS['All-In']
  }

  if (action === 'checkfold') {
    return seat.user.isFold ? LAST_ACTION_ACTIONS.Fold : LAST_ACTION_ACTIONS.Check
  }

  return capitalize(action)
}

export const isUserPlayingGame = (table: TypeTable, username: string) => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat || !userSeat?.user) return false
  if (userSeat.user.isSeatout) return false
  if (!userSeat.user.cards.length) return false
  if (isWaitPhase(table)) return false

  return true
}
