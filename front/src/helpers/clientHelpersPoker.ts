import {
  LAST_ACTION_ACTIONS,
  SEAT_ROLES,
  TABLE_PASOORS,
  TABLE_PHASES,
} from 'src/configs/clientConstantsPoker'
import {
  TypeCard,
  TypeRaiseLimits,
  TypeSeat,
  TypeTable,
  TypeTablePasoor,
  TypeTablePhase,
} from 'src/interfaces/type-game'
import { capitalize } from 'src/helpers/common'

/////////////////////////////////// 1 SMALL METHODS //////////////////////////////////

export const renderNumber = (value: string): number => {
  return isNaN(+value) ? 0 : +value
}

export const roundNumber = (number: number, digits = 2): number => {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

export const getRandomNumber = (to: number): number => {
  return Math.floor(Math.random() * to)
}

export const getDeadline = (timeout = 0): number => {
  return Math.floor(new Date().valueOf() / 1000) + timeout
}

export const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const isWaitPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.wait

export const isPreflopPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.preflop

export const isShowPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.show

export const isFinishPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.finish

export const isShowOrFinishPhase = (table: TypeTable): boolean =>
  isShowPhase(table) || isFinishPhase(table)

export const isSeatoutSeat = (seat: TypeSeat): boolean => !!seat.user?.isSeatout

export const isFoldSeat = (seat: TypeSeat): boolean => !!seat.user?.isFold

export const isAllinSeat = (seat: TypeSeat): boolean => !seat.user?.cash.inGame

export const isWithoutCardsSeat = (seat: TypeSeat): boolean => !seat.user?.cards.length

export const isWaitForBBSeat = (seat: TypeSeat): boolean => !!seat?.user?.isWaitForBB

const isSeatHasRole = (seat: TypeSeat, role: string): boolean => !!seat.role && seat.role === role

const isAnyCardsVisible = (seat: TypeSeat): boolean => !!seat.user.cards.find(c => c.isVisible)

const isTableClosedSeat = (seat: TypeSeat): boolean => !!seat?.user?.isTableClosed

export const isWinnerSeat = (seat: TypeSeat): boolean => !!seat?.user.winnerPotIds.length

export const isStradleSeat = (seat: TypeSeat): boolean => !!seat?.user.isStradle

export const isSeatoutNextRoundSeat = (seat: TypeSeat): boolean => !!seat.user?.isSeatoutNextRound

export const isDealerSeat = (seat: TypeSeat): boolean => seat.role === SEAT_ROLES.dealer

export const isAuthSeat = (seat: TypeSeat, username: string): boolean =>
  seat.user?.username === username

export const getUserSeat = (table: TypeTable, username: string): TypeSeat | null =>
  table.seats.find(s => s.user?.username === username) || null

export const getUserCardsCount = (tablePasoor: TypeTablePasoor): number => {
  if (tablePasoor === TABLE_PASOORS.omaha5) return 5
  if (tablePasoor === TABLE_PASOORS.omaha4) return 4

  return 2
}

/////////////////////////////////// 2 SEAT METHODS //////////////////////////////////

const isUserJoinedTable = (table: TypeTable, username: string): boolean => {
  const isUserWaited = isUserWaitingTable(table, username)

  if (isUserWaited) return true

  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false

  return !isTableClosedSeat(userSeat)
}

export const isUserWaitForBB = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false

  return isWaitForBBSeat(userSeat)
}

export const isUserGameTurn = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false

  return isSeatHasRole(userSeat, table.roleTurn)
}

export const getNotSeatOutPlayers = (table: TypeTable): TypeSeat[] =>
  table.seats.filter(s => s.user && !isSeatoutSeat(s))

export const isAtLeastTwoNotSeatOutPlayers = (table: TypeTable): boolean =>
  getNotSeatOutPlayers(table).length > 1

export const findUserTables = (allTables: TypeTable[], username: string): TypeTable[] =>
  allTables.filter(t => isUserJoinedTable(t, username))

export const showBackcard = (
  seat: TypeSeat,
  username: string,
  table: TypeTable,
  card: TypeCard,
) => {
  if (isShowPhase(table)) return false
  if (card.isVisible) return false
  if (isAuthSeat(seat, username)) return false

  return true
}

const isUserPlayingGame = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false
  if (!userSeat.user) return false
  if (isWaitPhase(table)) return false
  if (isSeatoutSeat(userSeat)) return false
  if (isWithoutCardsSeat(userSeat)) return false

  return true
}

/////////////////////////////////// 3 POLICY METHODS //////////////////////////////////

export const canSeeSeatUserTimer = (table: TypeTable, username: string): boolean => {
  if (isShowOrFinishPhase(table)) return false
  if (!isUserGameTurn(table, username)) return false

  return true
}

export const canUserJoinTable = (table: TypeTable, username: string, balance: number): boolean => {
  return !isUserJoinedTable(table, username) && balance >= table.buyin.min
}

export const canSeeTableActionsJoinGame = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false

  return isSeatoutSeat(userSeat)
}

export const canSeeTableActionsJoinPlay = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false
  if (!isWithoutCardsSeat(userSeat)) return false
  if (isSeatoutSeat(userSeat)) return false
  if (!isAtLeastTwoNotSeatOutPlayers(table)) return false
  if (getNotSeatOutPlayers(table).length < 3) return false

  return true
}

export const canSeeTableActionsLeaveGame = (table: TypeTable, username: string): boolean =>
  isUserPlayingGame(table, username)

export const canSeeTableActionsStradle = (table: TypeTable): boolean =>
  getNotSeatOutPlayers(table).length > 3

export const canSeeTableActionsGameTurn = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false
  if (isAllinSeat(userSeat)) return false
  if (!isUserGameTurn(table, username)) return false

  return true
}

export const canSeeTableActionsPreTurn = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)
  const isWaitingOrShowPhase = isWaitPhase(table) || isShowOrFinishPhase(table)

  if (!userSeat) return false
  if (isWaitingOrShowPhase) return false

  if (isFoldSeat(userSeat)) return false
  if (!isAtLeastTwoNotSeatOutPlayers(table)) return false
  if (!isUserPlayingGame(table, username)) return false

  if (isAllinSeat(userSeat)) return false

  return true
}

export const canSeeTableActionsShowCards = (table: TypeTable, username: string): boolean => {
  const userSeat = getUserSeat(table, username)

  if (!userSeat) return false
  if (isWithoutCardsSeat(userSeat)) return false
  if (isSeatoutSeat(userSeat)) return false
  if (isAnyCardsVisible(userSeat)) return false
  if (!isShowOrFinishPhase(table)) return false
  if (!isWinnerSeat(userSeat)) return false

  return true
}

/////////////////////////////////// 4 BET METHODS //////////////////////////////////

export const getMaximumBet = (table: TypeTable) => {
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
  const minimumRaise = roundNumber(2 * maximumBet - prevMaximumBet, 2)

  return Math.max(table.blinds.big, minimumRaise)
}

export const getStepRaiseAmount = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  const prevMaximumBet = getPrevMaximumBet(table)
  const stepRaise = roundNumber(maximumBet - prevMaximumBet, 2)

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

/////////////////////////////////// 5 Utils //////////////////////////////////

export const checkIfLastActionIsAllIn = (action: string, seat: TypeSeat) => {
  if (isAllinSeat(seat)) {
    return LAST_ACTION_ACTIONS['All-In']
  }

  if (action === LAST_ACTION_ACTIONS.checkfold) {
    return seat.user.isFold ? LAST_ACTION_ACTIONS.Fold : LAST_ACTION_ACTIONS.Check
  }

  return capitalize(action)
}

export const isOneOtherPersonToCallRaise = (table: TypeTable, username: string): boolean => {
  for (const seat of table.seats) {
    if (!seat.user) continue
    if (isSeatoutSeat(seat)) continue
    if (isAllinSeat(seat)) continue
    if (isWithoutCardsSeat(seat)) continue
    if (seat.user.username === username) continue

    return true
  }

  return false
}

export const getTurnInPassingCards = (table: TypeTable, seat: TypeSeat): number => {
  const playersCount = getNotSeatOutPlayers(table).length
  if (seat.role === SEAT_ROLES.small) return 1

  if (playersCount === 2) {
    if (seat.role === SEAT_ROLES.dealer) return 2
  }
  if (playersCount === 3) {
    if (seat.role === SEAT_ROLES.big) return 2
    if (seat.role === SEAT_ROLES.dealer) return 3
  }
  if (playersCount === 4) {
    if (seat.role === SEAT_ROLES.big) return 2
    if (seat.role === SEAT_ROLES.underTheGun4) return 3
    if (seat.role === SEAT_ROLES.dealer) return 4
  }
  if (playersCount === 5) {
    if (seat.role === SEAT_ROLES.big) return 2
    if (seat.role === SEAT_ROLES.underTheGun4) return 3
    if (seat.role === SEAT_ROLES.underTheGunPlusOne5) return 4
    if (seat.role === SEAT_ROLES.dealer) return 5
  }
  if (playersCount === 6) {
    if (seat.role === SEAT_ROLES.big) return 2
    if (seat.role === SEAT_ROLES.underTheGun4) return 3
    if (seat.role === SEAT_ROLES.underTheGunPlusOne5) return 4
    if (seat.role === SEAT_ROLES.underTheGunPlusTwo6) return 5
    if (seat.role === SEAT_ROLES.dealer) return 6
  }
  if (playersCount === 7) {
    if (seat.role === SEAT_ROLES.big) return 2
    if (seat.role === SEAT_ROLES.underTheGun4) return 3
    if (seat.role === SEAT_ROLES.underTheGunPlusOne5) return 4
    if (seat.role === SEAT_ROLES.underTheGunPlusTwo6) return 5
    if (seat.role === SEAT_ROLES.lowJack7) return 6
    if (seat.role === SEAT_ROLES.dealer) return 7
  }
  if (playersCount === 8) {
    if (seat.role === SEAT_ROLES.big) return 2
    if (seat.role === SEAT_ROLES.underTheGun4) return 3
    if (seat.role === SEAT_ROLES.underTheGunPlusOne5) return 4
    if (seat.role === SEAT_ROLES.underTheGunPlusTwo6) return 5
    if (seat.role === SEAT_ROLES.lowJack7) return 6
    if (seat.role === SEAT_ROLES.highJack8) return 7
    if (seat.role === SEAT_ROLES.dealer) return 8
  }
  if (playersCount === 9) {
    if (seat.role === SEAT_ROLES.big) return 2
    if (seat.role === SEAT_ROLES.underTheGun4) return 3
    if (seat.role === SEAT_ROLES.underTheGunPlusOne5) return 4
    if (seat.role === SEAT_ROLES.underTheGunPlusTwo6) return 5
    if (seat.role === SEAT_ROLES.lowJack7) return 6
    if (seat.role === SEAT_ROLES.highJack8) return 7
    if (seat.role === SEAT_ROLES.cutOff9) return 8
    if (seat.role === SEAT_ROLES.dealer) return 9
  }

  return 30
}

export const getTableCardsLength = (phase: TypeTablePhase) => {
  if (phase === TABLE_PHASES.flop) {
    return 3
  }

  if (phase === TABLE_PHASES.turn) {
    return 4
  }

  if (phase === TABLE_PHASES.river || phase === TABLE_PHASES.show) {
    return 5
  }

  return 0
}

export const calculateIsRabbitcard = (
  table: TypeTable,
  tableCardLength: number,
  cardIndex: number,
) => {
  const gameFinished = isShowOrFinishPhase(table)
  let isRabbitcard = false
  let hideCard = false

  if (cardIndex >= tableCardLength) {
    isRabbitcard = true

    if (!gameFinished) {
      hideCard = true
    }
    if (tableCardLength === 0 && cardIndex > 2) {
      hideCard = true
    }
  }

  return { hideCard, isRabbitcard }
}
