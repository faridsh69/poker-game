import {
  CARD_NUMBERS,
  CARD_TYPES,
  KANIAT_PERCENT,
  SEAT_ROLES,
  SERVER_TIMEOUT_ACTION,
  SERVER_TIMEOUT_CLEAR,
  SERVER_TIMEOUT_RESTART,
  SERVER_TIMEOUT_SEATOUT,
  SERVER_TIMEOUT_SEATOUT_ALLIN,
  SERVER_TIMEOUT_START,
  TABLE_PHASES,
  TIMER_ACTION_NAMES,
} from 'src/utils/serverPokerConstants'
import { getCardsScoreAndAchivement } from 'src/table/services/winnerService'
import {
  TypeCard,
  TypeScoreAndAchivements,
  TypeSeat,
  TypeSeatRole,
  TypeTable,
  TypeTablePhase,
  TypeTimer,
} from 'src/utils/serverPokerTypes'

export const roundNumber = (number: number, digits = 2): number => {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

export const getDeadline = (timeout = 0): number => {
  return Math.floor(new Date().valueOf() / 1000) + timeout
}

export const getTable = (tables: TypeTable[], tableId: number): TypeTable => {
  return tables.find(t => t.id === tableId) as TypeTable
}

export const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const isWaitPhase = (table: TypeTable): boolean => {
  return table.phase === TABLE_PHASES.wait
}

const isPreflopPhase = (table: TypeTable): boolean => {
  return table.phase === TABLE_PHASES.preflop
}

const isShowPhase = (table: TypeTable): boolean => {
  return table.phase === TABLE_PHASES.show
}

const isFinishPhase = (table: TypeTable): boolean => {
  return table.phase === TABLE_PHASES.finish
}

const isShowOrFinishPhase = (table: TypeTable): boolean => {
  return isShowPhase(table) || isFinishPhase(table)
}

const isSeatoutSeat = (seat: TypeSeat): boolean => {
  return !!seat.user?.isSeatout
}

const isFoldSeat = (seat: TypeSeat): boolean => {
  return !!seat.user?.isFold
}

const isAllinSeat = (seat: TypeSeat): boolean => {
  return !seat.user?.cash.inGame
}

const isWithCardSeat = (seat: TypeSeat): boolean => {
  return !!seat.user?.cards.length
}

const isNotEnoughCashThanBlinds = (seat: TypeSeat, table: TypeTable): boolean => {
  if (!seat.user) return true

  return seat.user?.cash?.inGame < table.blinds.big
}

/////////////////////////////////// 1 START SEAT //////////////////////////////////
const getActiveSeats = (
  table: TypeTable,
  includeFolders = false,
  includeAllIns = false,
  includeWaitings = false,
  includeSitouts = false,
): TypeSeat[] => {
  return table.seats.filter(s => {
    if (!s.user) return false
    if (!includeFolders && isFoldSeat(s)) return false
    if (!includeAllIns && isAllinSeat(s)) return false
    if (!includeWaitings && !isWithCardSeat(s)) return false
    if (!includeSitouts && isSeatoutSeat(s)) return false

    return true
  })
}

export const isAtLeastTwoPlayers = (
  table: TypeTable,
  includeFolders = false,
  includeAllIns = false,
  includeWaitings = false,
  includeSitouts = false,
): boolean => {
  const seats = getActiveSeats(
    table,
    includeFolders,
    includeAllIns,
    includeWaitings,
    includeSitouts,
  )

  return seats.length > 1
}

const increaseSeatId = (seatId: number, tableSeatsLength: number): number => {
  const nextSeatId = seatId + 1

  return nextSeatId > tableSeatsLength ? 1 : nextSeatId
}

export const getNextSeatId = (
  table: TypeTable,
  seatId: number,
  includeFolders = false,
  includeAllIns = false,
  includeWaitings = false,
  includeSitouts = false,
): number => {
  const acceptedSeats = getActiveSeats(
    table,
    includeFolders,
    includeAllIns,
    includeWaitings,
    includeSitouts,
  )

  const tableSeatsLength = table.seats.length
  let nextSeatId = increaseSeatId(seatId, tableSeatsLength)
  while (!acceptedSeats.map(s => s.id).includes(nextSeatId)) {
    nextSeatId = increaseSeatId(nextSeatId, tableSeatsLength)
  }

  return nextSeatId
}

const getCurrentRoleSeatId = (table: TypeTable, role: TypeSeatRole): number => {
  const roleSeat = table.seats.find(s => s.role === role)

  if (roleSeat) {
    return roleSeat.id
  }

  if (role === SEAT_ROLES.dealer) {
    return getRandomDealerSeatId(table)
  }

  if (role === SEAT_ROLES.big) {
    const isHeadsUp = checkPlayersCount(table, 2)
    if (isHeadsUp) {
      return getCurrentRoleSeatId(table, SEAT_ROLES.small)
    }
  }

  throw `${role} seat could not found!`
}

const getRandomDealerSeatId = (table: TypeTable): number => {
  const seats = getActiveSeats(table, true, true, true, false)
  const randomSeatIndex = Math.floor(Math.random() * seats.length)

  return seats[randomSeatIndex].id
}

const getNewRoundGameTurnSeatId = (table: TypeTable): number => {
  const currentSmallSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.small)
  const acceptedSeats = getActiveSeats(table, false, false, false, false)

  if (acceptedSeats.map(s => s.id).includes(currentSmallSeatId)) return currentSmallSeatId

  return getNextSeatId(table, currentSmallSeatId, false, false, false, false)
}

const getCurrentGameTurnSeatId = (table: TypeTable): number => {
  const gameTurnSeat = table.seats.find(s => s.role === table.roleTurn)

  if (gameTurnSeat) {
    return gameTurnSeat.id
  }

  throw 'gameTurn could not found!'
}

const getOnlyPlayingSeatId = (table: TypeTable): number => {
  const activeSeats = getActiveSeats(table, false, true, false, false)

  if (activeSeats.length === 1) {
    return activeSeats[0].id
  }

  throw 'getOnlyPlayingSeatId could not found activeSeats.length: ' + activeSeats.length
}

const checkPlayersCount = (table: TypeTable, playersCount: number): boolean => {
  if (isWaitPhase(table) || isShowOrFinishPhase(table)) {
    return getActiveSeats(table, true, true, true, false).length === playersCount
  }

  return getActiveSeats(table, true, true, false, false).length === playersCount
}

/////////////////////////////////// 1 END SEAT //////////////////////////////////

/////////////////////////////////// 2 START TIMER //////////////////////////////////

export const isTimeToStartTable = (table: TypeTable): boolean => {
  return isWaitPhase(table) && isAtLeastTwoPlayers(table, true, false, true, false)
}

export const isTimeToClearTableInMiddleOfGame = (table: TypeTable): boolean => {
  return !isWaitPhase(table) && !isAtLeastTwoPlayers(table, true, true, false, false)
}

export const isTimeToClearTableInShowPhase = (table: TypeTable): boolean => {
  return !isAtLeastTwoPlayers(table, true, false, false, false)
}

export const getLeaveSeatTimer = (isAllin = false): TypeTimer => {
  return {
    deadline: getDeadline(isAllin ? SERVER_TIMEOUT_SEATOUT_ALLIN : SERVER_TIMEOUT_SEATOUT),
    action: TIMER_ACTION_NAMES.leaveSeat,
    extra: false,
  }
}

const getCheckfoldtimer = (): TypeTimer => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_ACTION),
    action: TIMER_ACTION_NAMES.checkfold,
    extra: false,
  }
}

const getExtraCheckfoldtimer = (seat: TypeSeat): TypeTimer => {
  const timeBank = seat.user?.timeBank || 0

  return {
    deadline: getDeadline(timeBank),
    action: TIMER_ACTION_NAMES.checkfold,
    extra: true,
  }
}

export const getStartTableTimer = (): TypeTimer => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_START),
    action: TIMER_ACTION_NAMES.restartTable,
    extra: false,
  }
}

const getRestartTableTimer = (): TypeTimer => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_RESTART),
    action: TIMER_ACTION_NAMES.restartTable,
    extra: false,
  }
}

export const getClearTableTimer = (): TypeTimer => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_CLEAR),
    action: TIMER_ACTION_NAMES.clearTable,
    extra: false,
  }
}

export const getUpdatedSeatWithTimeBank = (table: TypeTable): TypeTable => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s
      if (!s.user.timer) return s
      if (currentGameTurnSeatId !== s.id) return s

      const extraTimer = getExtraCheckfoldtimer(s)

      return {
        ...s,
        user: {
          ...s.user,
          timer: extraTimer,
        },
      }
    }),
  }
}
/////////////////////////////////// 2 END TIMER //////////////////////////////////

/////////////////////////////////// 3 START BET //////////////////////////////////

const getMaximumBet = (table: TypeTable): number => {
  let maximumBet = -1
  const seats = getActiveSeats(table, false, true, false, false)

  for (const seat of seats) {
    if (seat.user && seat.user.cash.inPot > maximumBet) {
      maximumBet = seat.user.cash.inPot
    }
  }

  return maximumBet
}

const getMaximumBetSeatIds = (table: TypeTable): number[] => {
  const maximumBet = getMaximumBet(table)
  const maximumBetSeatIds: number[] = []
  const seats = getActiveSeats(table, false, true, false, false)

  for (const seat of seats) {
    if (seat.user && seat.user.cash.inPot === maximumBet) {
      maximumBetSeatIds.push(seat.id)
    }
  }

  return maximumBetSeatIds
}

const getRaiserSeatId = (table: TypeTable): number => {
  const maximumBet = getMaximumBet(table)

  if (maximumBet === 0) {
    return getNewRoundGameTurnSeatId(table)
  }

  const maximumBetSeatIds = getMaximumBetSeatIds(table)
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  let raiserSeatId = getNextSeatId(table, currentGameTurnSeatId, false, true, false, false)
  let trying = 100
  while (!maximumBetSeatIds.includes(raiserSeatId) && trying) {
    raiserSeatId = getNextSeatId(table, raiserSeatId, false, true)
    trying = trying - 1
  }

  if (!trying) {
    throw 'getRaiserSeatId error'
  }

  return raiserSeatId
}

export const isCheckAllowed = (table: TypeTable): boolean => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)
  const maximumBetSeatIds = getMaximumBetSeatIds(table)

  return maximumBetSeatIds.includes(currentGameTurnSeatId)
}

const getTableTotal = (table: TypeTable): number => {
  const total = table.seats
    .filter(s => s.user)
    .reduce((sum, s) => {
      if (!s.user) return sum

      return sum + s.user.cash.inPot
    }, 0)

  return total + table.pot
}

const isAllPlayersAllIn = (table: TypeTable): boolean => {
  const inGameSeats = table.seats.filter(
    s =>
      s.user && !isSeatoutSeat(s) && !s.user.isFold && (isWaitPhase(table) || s.user.cards.length),
  )

  if (inGameSeats.length < 2) return false

  return inGameSeats.filter(s => !isAllinSeat(s)).length < 2
}

/////////////////////////////////// 3 END BET //////////////////////////////////

/////////////////////////////////// 4 START RESET GAME //////////////////////////////////

const getMaximumScore = (scoreAndAchievements: TypeScoreAndAchivements): number => {
  const seatIds = Object.keys(scoreAndAchievements)
  let maximumScore = -1

  for (const seatId of seatIds) {
    if (scoreAndAchievements[seatId].score > maximumScore) {
      maximumScore = scoreAndAchievements[seatId].score
    }
  }

  return maximumScore
}

const getScoreAndAchievements = (table: TypeTable): TypeScoreAndAchivements => {
  const tableCards = table.cards
  const scoreAndAchivements: TypeScoreAndAchivements = {}
  const seats = getActiveSeats(table, false, true, false, false)

  for (const seat of seats) {
    const userCards = seat.user?.cards || []
    const tableAndUserCards = [...tableCards, ...userCards]
    scoreAndAchivements[seat.id] = getCardsScoreAndAchivement(tableAndUserCards)
  }

  return scoreAndAchivements
}

const getWinnerSeatIds = (scoreAndAchievements: TypeScoreAndAchivements): number[] => {
  const seatIds = Object.keys(scoreAndAchievements)
  const maximumScore = getMaximumScore(scoreAndAchievements)
  const winnerSeatIds: number[] = []

  for (const seatId of seatIds) {
    if (scoreAndAchievements[seatId].score === maximumScore) {
      winnerSeatIds.push(+seatId)
    }
  }

  return winnerSeatIds
}

const getRandomCards = (cardsCount: number, usedCards: TypeCard[]): TypeCard[] => {
  const cards: TypeCard[] = []
  const updatedUsedCards = [...usedCards]

  while (cards.length < cardsCount) {
    const cardTypeIndex = Math.floor(Math.random() * 4)
    const cardNumberIndex = Math.floor(Math.random() * 13)
    const card = {
      type: Object.values(CARD_TYPES)[cardTypeIndex],
      number: Object.values(CARD_NUMBERS)[cardNumberIndex],
    }

    const isUsed = updatedUsedCards.find(c => c.type === card.type && c.number === card.number)

    if (!isUsed) {
      cards.push(card)
      updatedUsedCards.push(card)
    }
  }

  return cards
}

const getNextTablePhase = (currentPhase: TypeTablePhase): TypeTablePhase => {
  const tablePhases = Object.values(TABLE_PHASES)
  let nextPhase = tablePhases[0]
  let foundPhase = false

  for (const tablePhase of tablePhases) {
    if (foundPhase) {
      nextPhase = tablePhase
      break
    }

    if (tablePhase === currentPhase) {
      foundPhase = true
    }
  }

  return nextPhase
}

/////////////////////////////////// 4 END RESET GAME //////////////////////////////////

/////////////////////////////////// 5 START CONTROLLERS GENERAL //////////////////////////////////

export const getIsPhaseFinished = (table: TypeTable): boolean => {
  if (!isAtLeastTwoPlayers(table, false, true, false, false)) return true

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  if (isPreflopPhase(table)) {
    if (getMaximumBet(table) === table.blinds.big) {
      const currentBigSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.big)
      if (checkPlayersCount(table, 2)) {
      }

      return currentBigSeatId === currentGameTurnSeatId
    }
  }

  const nextGameTurnSeatId = getNextSeatId(table, currentGameTurnSeatId, false, false, false, false)
  const raiserSeatId = getRaiserSeatId(table)

  if (currentGameTurnSeatId === nextGameTurnSeatId) {
    return true
  }

  return raiserSeatId === nextGameTurnSeatId
}

export const getUpdatedTableIfPhaseFinished = (
  table: TypeTable,
  isPhaseFinished: boolean,
): TypeTable => {
  if (!isPhaseFinished) return table

  let tablePhase = getNextTablePhase(table.phase)
  const tablePot = getTableTotal(table)

  let scoreAndAchievements: TypeScoreAndAchivements = {}
  let winnerSeatIds: number[] = []
  let winnerReward = 0

  const atLeastTwoPlayers = isAtLeastTwoPlayers(table, false, false)
  const allPlayersAllIn = isAllPlayersAllIn(table)

  if (tablePhase === TABLE_PHASES.show) {
    scoreAndAchievements = getScoreAndAchievements(table)
    winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
  } else if (allPlayersAllIn) {
    tablePhase = TABLE_PHASES.show
    scoreAndAchievements = getScoreAndAchievements(table)
    winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
  } else if (!atLeastTwoPlayers) {
    tablePhase = TABLE_PHASES.finish
    winnerSeatIds = [getOnlyPlayingSeatId(table)]
  }

  if (winnerSeatIds.length) {
    winnerReward = roundNumber((tablePot / winnerSeatIds.length) * (1 - KANIAT_PERCENT / 100))
  }

  const finishedPhaseTable = {
    ...table,
    phase: tablePhase,
    pot: tablePot,
    total: 0,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s

      const isWinner = winnerSeatIds.includes(s.id)

      return {
        ...s,
        user: {
          ...s.user,
          cash: {
            ...s.user.cash,
            inPot: 0,
            inGame: isWinner ? s.user.cash.inGame + winnerReward : s.user.cash.inGame,
          },
          achievement: scoreAndAchievements[s.id]?.achievement,
          isWinner,
          gameTurn: false,
          timer: null,
        },
      }
    }),
  }

  const seatoutedNotEnoughCashes = {
    ...finishedPhaseTable,
    roleTurn: null,
    seats: finishedPhaseTable.seats.map(seat => {
      if (!seat.user) return seat
      if (isSeatoutSeat(seat)) return seat

      const isNotEnoughCash = isNotEnoughCashThanBlinds(seat, finishedPhaseTable)

      return {
        ...seat,
        user: {
          ...seat.user,
          isSeatout: isNotEnoughCash && winnerReward ? true : seat.user.isSeatout,
          timer:
            isNotEnoughCash && winnerReward ? getLeaveSeatTimer(isNotEnoughCash) : seat.user.timer,
        },
      }
    }),
  }

  const timer = isTimeToClearTableInShowPhase(finishedPhaseTable)
    ? getClearTableTimer()
    : getRestartTableTimer()

  return {
    ...seatoutedNotEnoughCashes,
    timer: winnerReward ? timer : null,
  }
}

export const getUpdatedTableNextGameTurn = (
  table: TypeTable,
  isPhaseFinished: boolean,
): TypeTable => {
  if (isShowOrFinishPhase(table)) return table

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)
  const nextGameTurnSeatId = isPhaseFinished
    ? getNewRoundGameTurnSeatId(table)
    : getNextSeatId(table, currentGameTurnSeatId, false, false, false, false)

  return {
    ...table,
    total: getTableTotal(table),
    // @ts-ignore
    roleTurn: table.seats.find(s => s.id === nextGameTurnSeatId)?.role,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s

      const timeBank =
        currentGameTurnSeatId === s.id && s.user.timer?.extra
          ? s.user.timer.deadline - getDeadline()
          : s.user.timeBank

      return {
        ...s,
        user: {
          ...s.user,
          timeBank,
          timer: nextGameTurnSeatId === s.id ? getCheckfoldtimer() : null,
        },
      }
    }),
  }
}

/////////////////////////////////// 5 END CONTROLLERS GENERAL //////////////////////////////////

/////////////////////////////////// 6 START CONTROLLERS ACTIONS //////////////////////////////////

export const getUpdatedSeatWithFold = (table: TypeTable): TypeTable => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s

      const isFold = currentGameTurnSeatId === s.id ? true : s.user.isFold

      return {
        ...s,
        user: {
          ...s.user,
          isFold,
        },
      }
    }),
  }
}

export const getUpdatedSeatWithRaiseOrCallAmount = (
  table: TypeTable,
  amount: number,
): TypeTable => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s

      const addedToPot = currentGameTurnSeatId === s.id ? amount : 0
      const inPot = s.user.cash.inPot + addedToPot
      const inGame = roundNumber(s.user.cash.inGame - addedToPot)

      return {
        ...s,
        user: {
          ...s.user,
          cash: {
            ...s.user.cash,
            inPot,
            inGame,
          },
        },
      }
    }),
  }
}

/////////////////////////////////// 6 END CONTROLLERS ACTIONS //////////////////////////////////

export const clearTable = (table: TypeTable): TypeTable => {
  return {
    ...table,
    phase: TABLE_PHASES.wait,
    pot: 0,
    total: 0,
    cards: [],
    timer: null,
    roleTurn: null,
    seats: table.seats.map(s => {
      if (!s.user) return s

      const isAllin = isAllinSeat(s)

      return {
        ...s,
        role: null,
        user: {
          ...s.user,
          cards: [],
          isWinner: false,
          achievement: '',
          isFold: false,
          cash: {
            ...s.user.cash,
            inPot: 0,
            inGame: s.user.cash.inGame + table.total,
          },
          isSeatout: isAllin ? true : s.user.isSeatout,
          timer: isAllin ? getLeaveSeatTimer(isAllin) : s.user.timer,
        },
      }
    }),
  }
}

const getUpdateSeatRoles = (table: TypeTable): TypeTable => {
  const currentDealerSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.dealer)
  const newDealerSeatId = getNextSeatId(table, currentDealerSeatId, true, false, true, false)
  const newSmallSeatId = getNextSeatId(table, newDealerSeatId, true, false, true, false)
  const newBigSeatId = getNextSeatId(table, newSmallSeatId, true, false, true, false)
  const newUnderTheGunSeatId = getNextSeatId(table, newBigSeatId, true, false, true, false)
  const newUnderTheGunPlusOneSeatId = getNextSeatId(
    table,
    newUnderTheGunSeatId,
    true,
    false,
    true,
    false,
  )

  const newUnderTheGunPlusTwoSeatId = getNextSeatId(
    table,
    newUnderTheGunPlusOneSeatId,
    true,
    false,
    true,
    false,
  )

  const newLowJackSeatId = getNextSeatId(
    table,
    newUnderTheGunPlusTwoSeatId,
    true,
    false,
    true,
    false,
  )
  const newHighJackSeatId = getNextSeatId(table, newLowJackSeatId, true, false, true, false)
  const newCutOffSeatId = getNextSeatId(table, newHighJackSeatId, true, false, true, false)

  return {
    ...table,
    seats: table.seats.map(s => {
      let seatRole = null
      if (s.id === newDealerSeatId) {
        seatRole = SEAT_ROLES.dealer
      } else if (s.id === newSmallSeatId) {
        seatRole = SEAT_ROLES.small
      } else if (s.id === newBigSeatId) {
        seatRole = SEAT_ROLES.big
      } else if (s.id === newUnderTheGunSeatId) {
        seatRole = SEAT_ROLES.underTheGun
      } else if (s.id === newUnderTheGunPlusOneSeatId) {
        seatRole = SEAT_ROLES.underTheGunPlusOne
      } else if (s.id === newUnderTheGunPlusTwoSeatId) {
        seatRole = SEAT_ROLES.underTheGunPlusTwo
      } else if (s.id === newLowJackSeatId) {
        seatRole = SEAT_ROLES.lowJack
      } else if (s.id === newHighJackSeatId) {
        seatRole = SEAT_ROLES.highJack
      } else if (s.id === newCutOffSeatId) {
        seatRole = SEAT_ROLES.cutOff
      }

      return {
        ...s,
        role: seatRole,
      }
    }),
  }
}

export const resetTable = (pureTable: TypeTable): TypeTable => {
  const table = getUpdateSeatRoles(pureTable)
  const isHeadsUp = checkPlayersCount(table, 2)
  const isTheePlayer = checkPlayersCount(table, 3)
  const roleTurn = isHeadsUp || isTheePlayer ? SEAT_ROLES.dealer : SEAT_ROLES.underTheGun

  const tableCards = getRandomCards(5, [])
  let usedCards = [...tableCards]

  return {
    ...table,
    pot: 0,
    phase: TABLE_PHASES.preflop,
    total: table.blinds.small + table.blinds.big,
    cards: tableCards,
    timer: null,
    roleTurn,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s))
        return {
          ...s,
          role: null,
          user: {
            ...s.user,
            cards: [],
            isWinner: false,
            achievement: '',
            isFold: false,
          },
        }

      const isSmall = isHeadsUp ? s.role === SEAT_ROLES.dealer : s.role === SEAT_ROLES.small
      const isBig = isHeadsUp ? s.role === SEAT_ROLES.small : s.role === SEAT_ROLES.big

      const userCards = getRandomCards(2, usedCards)
      usedCards = [...usedCards, ...userCards]

      const addedToPot = isSmall ? table.blinds.small : isBig ? table.blinds.big : 0
      const inPot = addedToPot
      const inGame = roundNumber(s.user.cash.inGame - addedToPot)

      return {
        ...s,
        user: {
          ...s.user,
          cards: userCards,
          isWinner: false,
          isFold: false,
          achievement: '',
          cash: {
            ...s.user.cash,
            inPot,
            inGame,
          },
          timer: roleTurn === s.role ? getCheckfoldtimer() : null,
        },
      }
    }),
  }
}
