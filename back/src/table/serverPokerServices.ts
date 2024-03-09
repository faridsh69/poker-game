import {
  CARD_NUMBERS,
  CARD_TYPES,
  EMPTY_POT,
  EMPTY_POT_ID,
  KANIAT_PERCENT,
  SEAT_ROLES,
  SERVER_TIMEOUT_ACTION,
  SERVER_TIMEOUT_CLEAR,
  SERVER_TIMEOUT_EXTRA,
  SERVER_TIMEOUT_RESTART,
  SERVER_TIMEOUT_SEATOUT,
  SERVER_TIMEOUT_SEATOUT_ALLIN,
  SERVER_TIMEOUT_START,
  TABLE_PASOORS,
  TABLE_PHASES,
  TIMER_ACTION_NAMES,
} from 'src/utils/serverPokerConstants'
import { getCardsScoreAndAchivement } from 'src/table/services/winnerService'
import {
  TypeCard,
  TypePot,
  TypePotWinner,
  TypeScoreAndAchivements,
  TypeSeat,
  TypeSeatRole,
  TypeTable,
  TypeTablePasoor,
  TypeTablePhase,
  TypeTimer,
} from 'src/utils/serverPokerTypes'
import { SEATOUT_USER } from 'src/utils/serverPokerConstants'
// import { TestTwoPair } from 'src/utils/testData'
// import { TestSeperatePotTable } from 'src/utils/testData'

export const roundNumber = (number: number, digits = 2): number =>
  Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)

const getRandomNumber = (to: number): number => {
  return Math.floor(Math.random() * to)
}

export const getDeadline = (timeout = 0): number => Math.floor(new Date().valueOf() / 1000) + timeout

export const getTable = (tables: TypeTable[], tableId: number): TypeTable => tables.find(t => t.id === tableId) as TypeTable

export const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  // console.log('t1 tablePots', getTablePots(TestSeperatePotTable))
  // console.log('t2 getCardsScoreAndAchivement', getCardsScoreAndAchivement(TestTwoPair))

  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table: TypeTable, username: string): boolean =>
  !!table.waitingUsers.find(u => u.username === username)

export const isWaitPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.wait

export const isPreflopPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.preflop

export const isFlopPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.flop

export const isTurnPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.turn

export const isRiverPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.river

export const isSeatoutSeat = (seat: TypeSeat): boolean => !!seat.user?.isSeatout

const isShowPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.show

const isFinishPhase = (table: TypeTable): boolean => table.phase === TABLE_PHASES.finish

export const isShowOrFinishPhase = (table: TypeTable): boolean => isShowPhase(table) || isFinishPhase(table)

const getUserCardsCount = (tablePasoor: TypeTablePasoor): number => {
  if (tablePasoor === TABLE_PASOORS.omaha5) return 5
  if (tablePasoor === TABLE_PASOORS.omaha4) return 4

  return 2
}

const isAutoActionSeat = (seat: TypeSeat): boolean => !!seat.user?.isAutoAction

const isTableClosedSeat = (seat: TypeSeat): boolean => !!seat?.user?.isTableClosed

const isFoldSeat = (seat: TypeSeat): boolean => !!seat.user?.isFold

const isAllinSeat = (seat: TypeSeat): boolean => !seat.user?.cash.inGame

const isWithoutCardsSeat = (seat: TypeSeat): boolean => !seat.user?.cards.length

const isWithoutRoleSeat = (seat: TypeSeat): boolean => !seat.role

const isWaitForBBSeat = (seat: TypeSeat): boolean => !!seat.user?.isWaitForBB

const isNotEnoughCashThanBlinds = (seat: TypeSeat, table: TypeTable): boolean => {
  if (!seat.user) return true

  return seat.user?.cash?.inGame < table.blinds.big
}

const isStradleSeatUser = (seat: TypeSeat): boolean => !!seat.user?.isStradle

const isStradleSeat = (seat: TypeSeat): boolean => !!seat.isSeatStradle

const isTableHasStradle = (table: TypeTable): boolean => !!table.seats.find(s => isStradleSeat(s))

/////////////////////////////////// 1 START SEAT //////////////////////////////////
const getActiveSeats = (
  table: TypeTable,
  includeFolders = false,
  includeAllIns = false,
  includeWithoutCards = false,
  includeSitouts = false,
  includeWithoutRole = false,
  filterOnlyWaitForBB = false,
): TypeSeat[] => {
  return table.seats.filter(s => {
    if (!s.user) return false
    if (!includeFolders && isFoldSeat(s)) return false
    if (!includeAllIns && isAllinSeat(s)) return false
    if (!includeWithoutCards && isWithoutCardsSeat(s)) return false
    if (!includeSitouts && isSeatoutSeat(s)) return false
    if (!includeWithoutRole && isWithoutRoleSeat(s)) return false
    if (filterOnlyWaitForBB && isWaitForBBSeat(s)) return false

    return true
  })
}

export const isAtLeastTwoPlayers = (
  table: TypeTable,
  includeFolders = false,
  includeAllIns = false,
  includeWithoutCards = false,
  includeSitouts = false,
  includeWithoutRole = false,
  filterOnlyWaitForBB = false,
): boolean => {
  const seats = getActiveSeats(
    table,
    includeFolders,
    includeAllIns,
    includeWithoutCards,
    includeSitouts,
    includeWithoutRole,
    filterOnlyWaitForBB,
  )

  return seats.length > 1
}

const increaseSeatId = (seatId: number, tableSeatsLength: number): number => {
  const nextSeatId = seatId + 1

  return nextSeatId > tableSeatsLength ? 1 : nextSeatId
}

const getNextSeatId = (
  table: TypeTable,
  seatId: number,
  includeFolders = false,
  includeAllIns = false,
  includeWithoutCards = false,
  includeSitouts = false,
  includeWithoutRole = false,
  filterOnlyWaitForBB = false,
): number => {
  const acceptedSeats = getActiveSeats(
    table,
    includeFolders,
    includeAllIns,
    includeWithoutCards,
    includeSitouts,
    includeWithoutRole,
    filterOnlyWaitForBB,
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
    const players = getActiveSeats(table, true, true, false, false, false, false)
    const isHeadsUp = players.length === 2
    if (isHeadsUp) {
      return getCurrentRoleSeatId(table, SEAT_ROLES.small)
    }
  }

  throw `${role} seat could not found!`
}

const getRandomDealerSeatId = (table: TypeTable): number => {
  const seats = getActiveSeats(table, true, false, true, false, true, false)
  if (!seats.length) throw 'getRandomDealerSeatId not found seat'

  const randomSeatIndex = getRandomNumber(seats.length)

  return seats[randomSeatIndex].id
}

const getNewRoundGameTurnSeatId = (table: TypeTable): number => {
  const currentSmallSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.small)
  const acceptedSeats = getActiveSeats(table, false, false, false, false, false, false)

  if (acceptedSeats.map(s => s.id).includes(currentSmallSeatId)) return currentSmallSeatId

  return getNextSeatId(table, currentSmallSeatId, false, false, false, false, false, false)
}

const getCurrentGameTurnSeatId = (table: TypeTable): number => {
  const gameTurnSeat = table.seats.find(s => s.role === table.roleTurn)

  if (gameTurnSeat) {
    return gameTurnSeat.id
  }

  throw 'gameTurn could not found!'
}

const getOnlyPlayingSeatId = (table: TypeTable): number => {
  const activeSeats = getActiveSeats(table, false, true, false, false, false, false)

  if (activeSeats.length === 1) {
    return activeSeats[0].id
  }

  throw 'getOnlyPlayingSeatId could not found activeSeats.length: ' + activeSeats.length
}

/////////////////////////////////// 1 END SEAT ////////////////////////////////////

/////////////////////////////////// 2 START TIMER /////////////////////////////////

export const isTimeToStartTable = (table: TypeTable): boolean => {
  return isWaitPhase(table) && isAtLeastTwoPlayers(table, true, false, true, false, true, false)
}

export const isTimeToClearTableInMiddleOfGame = (table: TypeTable): boolean => {
  return !isWaitPhase(table) && !isAtLeastTwoPlayers(table, true, true, false, false, false, false)
}

const isTimeToClearOrResetTableInShowPhase = (table: TypeTable): boolean => {
  return !isAtLeastTwoPlayers(table, true, false, true, false, true, false)
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
  const currentTimer = seat.user?.timer?.deadline || getDeadline()
  const remainingTime = currentTimer - getDeadline()

  return {
    deadline: getDeadline(remainingTime + timeBank),
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

export const getUpdatedSeatWithAutoCheck = (table: TypeTable, isAutoAction: boolean): TypeTable => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s
      if (!s.user.timer) return s
      if (currentGameTurnSeatId !== s.id) return s

      return {
        ...s,
        user: {
          ...s.user,
          isAutoAction,
        },
      }
    }),
  }
}

/////////////////////////////////// 2 END TIMER ///////////////////////////////////

/////////////////////////////////// 3 START BET ///////////////////////////////////

const getMaximumBet = (table: TypeTable): number => {
  let maximumBet = -1
  const seats = getActiveSeats(table, false, true, false, false, false, false)

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
  const seats = getActiveSeats(table, false, true, false, false, false, false)

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

  let raiserSeatId = getNextSeatId(table, currentGameTurnSeatId, false, true, false, false, false, false)
  let trying = 100
  while (!maximumBetSeatIds.includes(raiserSeatId) && trying) {
    raiserSeatId = getNextSeatId(table, raiserSeatId, false, true, false, false, false, false)
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
  const totalInPots = table.seats
    .filter(s => s.user)
    .reduce((sum, s) => {
      if (!s.user) return sum

      return sum + s.user.cash.inPot
    }, 0)

  const totalTablePots = table.pots.reduce((sum, pot) => sum + pot.amount, 0)

  return totalInPots + totalTablePots
}

const isAllPlayersAllIn = (table: TypeTable): boolean => {
  const inGameSeats = table.seats.filter(
    s => s.user && !isSeatoutSeat(s) && !s.user.isFold && (isWaitPhase(table) || s.user.cards.length),
  )

  if (inGameSeats.length < 2) return false

  return inGameSeats.filter(s => !isAllinSeat(s)).length < 2
}

/////////////////////////////////// 3 END BET /////////////////////////////////////

/////////////////////////////////// 4 START RESET GAME ////////////////////////////

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
  const seats = getActiveSeats(table, false, true, false, false, false, false)

  for (const seat of seats) {
    const userCards = seat.user?.cards || []
    const tableAndUserCards = [...tableCards, ...userCards]
    scoreAndAchivements[seat.id] = getCardsScoreAndAchivement(tableAndUserCards)
  }

  return scoreAndAchivements
}

const getWinnerSeatIds = (scoreAndAchievements: TypeScoreAndAchivements): number[] => {
  const scoreAndAchievementSeatIds = Object.keys(scoreAndAchievements)
  const maximumScore = getMaximumScore(scoreAndAchievements)
  const winnerSeatIds: number[] = []

  for (const scoreAndAchievementSeatId of scoreAndAchievementSeatIds) {
    if (scoreAndAchievements[scoreAndAchievementSeatId].score === maximumScore) {
      winnerSeatIds.push(+scoreAndAchievementSeatId)
    }
  }

  return winnerSeatIds
}

const getRandomCards = (cardsCount: number, usedCards: TypeCard[]): TypeCard[] => {
  const cards: TypeCard[] = []
  const updatedUsedCards = [...usedCards]

  while (cards.length < cardsCount) {
    const cardTypeIndex = getRandomNumber(4)
    const cardNumberIndex = getRandomNumber(13)
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

/////////////////////////////////// 4 END RESET GAME ///////////////////////////////

/////////////////////////////////// 5 START CONTROLLERS GENERAL ////////////////////

export const getIsPhaseFinished2 = (table: TypeTable): boolean => {
  if (!isAtLeastTwoPlayers(table, false, true, false, false, false, false)) return true

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  if (isPreflopPhase(table)) {
    const maximumBet = getMaximumBet(table)
    if (maximumBet === table.blinds.big) {
      const currentBigSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.big)

      return currentBigSeatId === currentGameTurnSeatId
    }

    const tableHasStradle = isTableHasStradle(table)
    if (tableHasStradle && maximumBet === 2 * table.blinds.big) {
      const currentUnderTheGunSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.underTheGun4)

      return currentUnderTheGunSeatId === currentGameTurnSeatId
    }
  }

  const nextGameTurnSeatId = getNextSeatId(table, currentGameTurnSeatId, false, false, false, false, false, false)
  const raiserSeatId = getRaiserSeatId(table)

  if (currentGameTurnSeatId === nextGameTurnSeatId) {
    return true
  }

  return raiserSeatId === nextGameTurnSeatId
}

export const getUpdatedTableNextGameTurn4 = (table: TypeTable, isPhaseFinished: boolean): TypeTable => {
  if (isShowOrFinishPhase(table)) return table

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)
  const nextGameTurnSeatId = isPhaseFinished
    ? getNewRoundGameTurnSeatId(table)
    : getNextSeatId(table, currentGameTurnSeatId, false, false, false, false, false, false)

  const roleTurn = table.seats.find(s => s.id === nextGameTurnSeatId)?.role || null
  const tableTotal = getTableTotal(table)

  return {
    ...table,
    total: tableTotal,
    roleTurn,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s

      let timeBank = s.user.timeBank
      if (currentGameTurnSeatId === s.id && s.user.timer?.extra) {
        const remainingTime = s.user.timer.deadline - getDeadline()
        timeBank = Math.min(SERVER_TIMEOUT_EXTRA, remainingTime)
      }

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

/////////////////////////////////// 5 END CONTROLLERS GENERAL //////////////////////

/////////////////////////////////// 6 START CONTROLLERS ACTIONs ////////////////////

export const getUpdatedSeatWithFold1 = (table: TypeTable): TypeTable => {
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

export const getUpdatedSeatWithRaiseOrCallAmount1 = (table: TypeTable, amount: number): TypeTable => {
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

export const getUpdatedSeatWithShowCards = (table: TypeTable, username: string, cardIndexes: number[]): TypeTable => {
  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (s.user.username !== username) return s

      const userCards = s.user.cards
      const visibleUserCards = userCards.map((card, cardIndex) => {
        if (!cardIndexes.includes(cardIndex)) return card

        return {
          ...card,
          isVisible: true,
        }
      })

      return {
        ...s,
        user: {
          ...s.user,
          cards: visibleUserCards,
        },
      }
    }),
  }
}

export const getUpdatedSeatWithStradle = (table: TypeTable, username: string): TypeTable => {
  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (s.user.username !== username) return s

      return {
        ...s,
        user: {
          ...s.user,
          isStradle: !s.user.isStradle,
        },
      }
    }),
  }
}

export const getUpdatedSeatWithSeatoutNextRound = (table: TypeTable, username: string): TypeTable => {
  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (s.user.username !== username) return s

      return {
        ...s,
        user: {
          ...s.user,
          isSeatoutNextRound: !s.user.isSeatoutNextRound,
        },
      }
    }),
  }
}

/////////////////////////////////// 6 END CONTROLLERS ACTIONs //////////////////////

const getUpdateSeatRoles = (table: TypeTable): TypeTable => {
  const isOnlyOneActivePlayer = getActiveSeats(table, true, false, false, false, true, false).length === 1
  if (isWaitPhase(table) || isOnlyOneActivePlayer) {
    const curDSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.dealer)

    const newDSeatId = getNextSeatId(table, curDSeatId, true, false, true, false, true, false)
    const new2SeatId = getNextSeatId(table, newDSeatId, true, false, true, false, true, false)
    const new3SeatId = getNextSeatId(table, new2SeatId, true, false, true, false, true, false)
    const new4SeatId = getNextSeatId(table, new3SeatId, true, false, true, false, true, false)
    const new5SeatId = getNextSeatId(table, new4SeatId, true, false, true, false, true, false)
    const new6SeatId = getNextSeatId(table, new5SeatId, true, false, true, false, true, false)
    const new7SeatId = getNextSeatId(table, new6SeatId, true, false, true, false, true, false)
    const new8SeatId = getNextSeatId(table, new7SeatId, true, false, true, false, true, false)
    const new9SeatId = getNextSeatId(table, new8SeatId, true, false, true, false, true, false)

    return {
      ...table,
      seats: table.seats.map(s => {
        if (!s.user) return s
        if (isSeatoutSeat(s)) return s

        let seatRole = null
        if (s.id === newDSeatId) {
          seatRole = SEAT_ROLES.dealer
        } else if (s.id === new2SeatId) {
          seatRole = SEAT_ROLES.small
        } else if (s.id === new3SeatId) {
          seatRole = SEAT_ROLES.big
        } else if (s.id === new4SeatId) {
          seatRole = SEAT_ROLES.underTheGun4
        } else if (s.id === new5SeatId) {
          seatRole = SEAT_ROLES.underTheGunPlusOne5
        } else if (s.id === new6SeatId) {
          seatRole = SEAT_ROLES.underTheGunPlusTwo6
        } else if (s.id === new7SeatId) {
          seatRole = SEAT_ROLES.lowJack7
        } else if (s.id === new8SeatId) {
          seatRole = SEAT_ROLES.highJack8
        } else if (s.id === new9SeatId) {
          seatRole = SEAT_ROLES.cutOff9
        }

        return {
          ...s,
          role: seatRole,
        }
      }),
    }
  }

  if (isShowOrFinishPhase(table)) {
    const seatIds = []
    const tableSeats = getActiveSeats(table, true, false, true, false, true, false)
    let tableSeatsLength = tableSeats.length
    let isUnderGunAlsoStradle = false
    const isHeadsUp = tableSeatsLength === 2
    const curDSeatId = getCurrentRoleSeatId(table, SEAT_ROLES.dealer)

    const newDSeatId = getNextSeatId(table, curDSeatId, true, false, false, false, true, false)
    seatIds.push(newDSeatId)
    const new2SeatId = getNextSeatId(table, newDSeatId, true, false, isHeadsUp, false, true, false)
    seatIds.push(new2SeatId)
    const new3SeatId = getNextSeatId(table, new2SeatId, true, false, true, false, true, false)
    if (seatIds.includes(new3SeatId)) {
      tableSeatsLength = Math.min(tableSeatsLength, 2)
    }
    seatIds.push(new3SeatId)
    const new4SeatId = getNextSeatId(table, new3SeatId, true, false, true, false, true, true)

    if (seatIds.includes(new4SeatId)) {
      tableSeatsLength = Math.min(tableSeatsLength, 3)
    } else {
      const underTheGunSeat = tableSeats.find(s => s.id === new4SeatId)

      isUnderGunAlsoStradle = !!underTheGunSeat && isStradleSeatUser(underTheGunSeat)
    }
    seatIds.push(new4SeatId)
    const new5SeatId = getNextSeatId(table, new4SeatId, true, false, true, false, true, true)
    if (seatIds.includes(new5SeatId)) {
      tableSeatsLength = Math.min(tableSeatsLength, 4)
    }
    seatIds.push(new5SeatId)
    const new6SeatId = getNextSeatId(table, new5SeatId, true, false, true, false, true, true)
    if (seatIds.includes(new6SeatId)) {
      tableSeatsLength = Math.min(tableSeatsLength, 5)
    }
    seatIds.push(new6SeatId)
    const new7SeatId = getNextSeatId(table, new6SeatId, true, false, true, false, true, true)
    if (seatIds.includes(new7SeatId)) {
      tableSeatsLength = Math.min(tableSeatsLength, 6)
    }
    seatIds.push(new7SeatId)
    const new8SeatId = getNextSeatId(table, new7SeatId, true, false, true, false, true, true)
    if (seatIds.includes(new8SeatId)) {
      tableSeatsLength = Math.min(tableSeatsLength, 7)
    }
    seatIds.push(new8SeatId)
    const new9SeatId = getNextSeatId(table, new8SeatId, true, false, true, false, true, true)
    if (seatIds.includes(new9SeatId)) {
      tableSeatsLength = Math.min(tableSeatsLength, 8)
    }

    return {
      ...table,
      seats: table.seats.map(s => {
        if (!s.user) return s
        if (isSeatoutSeat(s)) return s

        let seatRole = null
        if (s.id === newDSeatId) {
          seatRole = SEAT_ROLES.dealer
        } else if (s.id === new2SeatId) {
          seatRole = SEAT_ROLES.small
        } else if (s.id === new3SeatId && tableSeatsLength > 2) {
          seatRole = SEAT_ROLES.big
        } else if (s.id === new4SeatId && tableSeatsLength > 3) {
          seatRole = SEAT_ROLES.underTheGun4
        } else if (s.id === new5SeatId && tableSeatsLength > 4) {
          seatRole = SEAT_ROLES.underTheGunPlusOne5
        } else if (s.id === new6SeatId && tableSeatsLength > 5) {
          seatRole = SEAT_ROLES.underTheGunPlusTwo6
        } else if (s.id === new7SeatId && tableSeatsLength > 6) {
          seatRole = SEAT_ROLES.lowJack7
        } else if (s.id === new8SeatId && tableSeatsLength > 7) {
          seatRole = SEAT_ROLES.highJack8
        } else if (s.id === new9SeatId && tableSeatsLength > 8) {
          seatRole = SEAT_ROLES.cutOff9
        }

        return {
          ...s,
          role: seatRole,
          isSeatStradle: seatRole === SEAT_ROLES.underTheGun4 && isUnderGunAlsoStradle,
        }
      }),
    }
  }

  return table
}

export const clearTable = (table: TypeTable): TypeTable => {
  return {
    ...table,
    phase: TABLE_PHASES.wait,
    pots: EMPTY_POT,
    total: 0,
    cards: [],
    timer: null,
    roleTurn: null,
    seats: table.seats.map(s => {
      if (!s.user) return s

      const isNotEnoughCash = isNotEnoughCashThanBlinds(s, table)
      const isAutoAction = isAutoActionSeat(s)
      const shouldBeSeatOut = isNotEnoughCash || isAutoAction

      return {
        ...s,
        role: null,
        user: {
          ...s.user,
          cards: [],
          winnerPotIds: [],
          achievement: '',
          isFold: false,
          isAutoAction: false,
          cash: {
            ...s.user.cash,
            inPot: 0,
            inGame: s.user.cash.inGame + table.total,
          },
          isSeatout: shouldBeSeatOut ? true : s.user.isSeatout,
          timer: shouldBeSeatOut ? getLeaveSeatTimer(isNotEnoughCash) : s.user.timer,
        },
      }
    }),
  }
}

const getNumberOfPlayersInStartGame = (table: TypeTable): number => {
  const playersInGame = getActiveSeats(table, true, false, true, false, false, false)
  const playersCount = playersInGame.length

  return playersCount
}

const getRoleTurnInStartGame = (table: TypeTable, playersCount: number): TypeSeatRole => {
  const tableHasStradleSeat = isTableHasStradle(table)

  if (playersCount === 2 || playersCount === 3) {
    return SEAT_ROLES.dealer
  }

  if (tableHasStradleSeat) {
    if (playersCount === 4) {
      return SEAT_ROLES.dealer
    }

    return SEAT_ROLES.underTheGunPlusOne5
  }

  return SEAT_ROLES.underTheGun4
}

const isSeatSmallInStartGame = (playersCount: number, seat: TypeSeat) => {
  if (playersCount === 2) {
    return seat.role === SEAT_ROLES.dealer
  }

  return seat.role === SEAT_ROLES.small
}

const isSeatBigInStartGame = (playersCount: number, seat: TypeSeat) => {
  if (playersCount === 2) {
    return seat.role === SEAT_ROLES.small
  }

  return seat.role === SEAT_ROLES.big
}

const getInpotInStartGame = (table: TypeTable, playersCount: number, seat: TypeSeat) => {
  const isSmall = isSeatSmallInStartGame(playersCount, seat)
  const isBig = isSeatBigInStartGame(playersCount, seat)
  const newJoinedPlayer = playersCount !== 2 && isWithoutCardsSeat(seat)
  const isStradle = isStradleSeat(seat)

  if (isSmall) {
    return table.blinds.small
  }

  if (isBig || newJoinedPlayer) {
    return table.blinds.big
  }

  if (isStradle) {
    return 2 * table.blinds.big
  }

  return 0
}

const getSeatoutedNotEnoughCashPlayersTable = (table: TypeTable): TypeTable => {
  return {
    ...table,
    seats: table.seats.map(seat => {
      if (!seat.user) return seat
      if (isSeatoutSeat(seat)) return seat

      const isNotEnoughCash = isNotEnoughCashThanBlinds(seat, table)

      const seatoutedSeatForNotEnoughCash = {
        ...seat,
        user: {
          ...seat.user,
          isSeatout: isNotEnoughCash ? true : seat.user.isSeatout,
          timer: isNotEnoughCash ? getLeaveSeatTimer(true) : seat.user.timer,
        },
      }

      const checkedSeatout = seatoutedSeatForNotEnoughCash.user.isSeatoutNextRound

      return {
        ...seatoutedSeatForNotEnoughCash,
        user: {
          ...seat.user,
          isSeatout: checkedSeatout ? true : seatoutedSeatForNotEnoughCash.user.isSeatout,
          timer: checkedSeatout ? getLeaveSeatTimer(false) : seatoutedSeatForNotEnoughCash.user.timer,
          isSeatoutNextRound: false,
        },
      }
    }),
  }
}

export const resetTable = (pureTable: TypeTable): TypeTable => {
  const seatoutedTable = getSeatoutedNotEnoughCashPlayersTable(pureTable)
  const table = getUpdateSeatRoles(seatoutedTable)
  const playersCount = getNumberOfPlayersInStartGame(table)
  const roleTurn = getRoleTurnInStartGame(table, playersCount)
  const tableHasStradleSeat = isTableHasStradle(table)

  const tableTotal = table.blinds.small + table.blinds.big + (tableHasStradleSeat ? table.blinds.big : 0)
  const tableCards = getRandomCards(5, [])
  let usedCards = [...tableCards]

  return {
    ...table,
    pots: EMPTY_POT,
    phase: TABLE_PHASES.preflop,
    total: tableTotal,
    cards: tableCards,
    timer: null,
    roleTurn,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) {
        return {
          ...s,
          role: null,
          user: {
            ...s.user,
            ...SEATOUT_USER,
          },
        }
      }

      if (!s.role) return s

      const userCards = getRandomCards(getUserCardsCount(table.pasoor), usedCards)
      usedCards = [...usedCards, ...userCards]

      const inPot = getInpotInStartGame(table, playersCount, s)
      const inGame = roundNumber(s.user.cash.inGame - inPot)

      return {
        ...s,
        user: {
          ...s.user,
          cards: userCards,
          winnerPotIds: [],
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

const calculateNewTablePhase = (table: TypeTable, atLeastTwoPlayers: boolean, allPlayersAllIn: boolean): TypeTablePhase => {
  if (allPlayersAllIn) {
    return TABLE_PHASES.show
  }

  if (!atLeastTwoPlayers) {
    return TABLE_PHASES.finish
  }

  return getNextTablePhase(table.phase)
}

const filterScoreAndAchievementsBySeatIds = (scoreAndAchievements: TypeScoreAndAchivements, seatIds: number[]) => {
  const output: TypeScoreAndAchivements = {}

  for (const seatId in scoreAndAchievements) {
    if (scoreAndAchievements.hasOwnProperty(seatId)) {
      if (seatIds.find(sId => sId === +seatId)) {
        output[seatId] = scoreAndAchievements[seatId]
      }
    }
  }

  return output
}

const calculateWinnerOfEachPot = (scoreAndAchievements: TypeScoreAndAchivements, tablePots: TypePot[]): TypePotWinner[] => {
  const pots: TypePotWinner[] = []

  for (const tablePot of tablePots) {
    const potScoreAndAchievements = filterScoreAndAchievementsBySeatIds(scoreAndAchievements, tablePot.seatIds)
    const winnerSeatIds = getWinnerSeatIds(potScoreAndAchievements)

    pots.push({
      id: tablePot.id,
      amount: tablePot.amount,
      winnerSeatIds,
      winnerReward: getWinnerReward(winnerSeatIds, tablePot.amount),
    })
  }

  return pots
}

const getWinnerReward = (winnerSeatIds: number[], tablePotAmount: number) => {
  if (winnerSeatIds.length) {
    return roundNumber((tablePotAmount / winnerSeatIds.length) * (1 - KANIAT_PERCENT / 100))
  }

  return 0
}

const calculatePotsWithWinnerSeatIds = (
  scoreAndAchievements: TypeScoreAndAchivements,
  allPlayersAllIn: boolean,
  atLeastTwoPlayers: boolean,
  table: TypeTable,
  tablePhase: TypeTablePhase,
  tablePots: TypePot[],
): TypePotWinner[] => {
  if (allPlayersAllIn) {
    return calculateWinnerOfEachPot(scoreAndAchievements, tablePots)
  }

  if (!atLeastTwoPlayers) {
    const potAmount = tablePots.find(pot => pot.id === 1)?.amount || -99999
    const winnerSeatIds = [getOnlyPlayingSeatId(table)]

    return [
      {
        id: 1,
        amount: potAmount,
        winnerSeatIds,
        winnerReward: getWinnerReward(winnerSeatIds, potAmount),
      },
    ]
  }

  if (tablePhase === TABLE_PHASES.show) {
    return calculateWinnerOfEachPot(scoreAndAchievements, tablePots)
  }

  return []
}

const getSeatoutedAutoActionPlayersTable = (table: TypeTable): TypeTable => {
  return {
    ...table,
    seats: table.seats.map(seat => {
      if (!seat.user) return seat
      if (isSeatoutSeat(seat)) return seat

      const shouldBeSeatOut = isAutoActionSeat(seat) || isTableClosedSeat(seat)

      return {
        ...seat,
        user: {
          ...seat.user,
          isSeatout: shouldBeSeatOut ? true : seat.user.isSeatout,
          timer: shouldBeSeatOut ? getLeaveSeatTimer(false) : seat.user.timer,
        },
      }
    }),
  }
}

const getMinimumInPot = (seats: TypeSeat[]): number => {
  let minimumInPot = 0
  for (const seat of seats) {
    if (!seat.user || !seat.user.cash.inPot) continue

    if (!minimumInPot || minimumInPot > seat.user.cash.inPot) {
      minimumInPot = seat.user.cash.inPot
    }
  }

  return minimumInPot
}

const isSamePot = (pot1: TypePot, pot2: TypePot) => {
  return JSON.stringify(pot1.seatIds) === JSON.stringify(pot2.seatIds)
}

const isSamePotAndNotFolded = (tablePot: TypePot, userPot: TypePot, table: TypeTable) => {
  for (const tablePotSeatId of tablePot.seatIds) {
    if (!userPot.seatIds.includes(tablePotSeatId)) {
      const seat = table.seats.find(s => s.id === tablePotSeatId)

      if (seat && seat.user && !seat.user.isFold) return false
    }
  }

  return true
}

const getMergePots = (userPots: TypePot[], table: TypeTable): TypePot[] => {
  const pots: TypePot[] = []
  const tablePots = table.pots

  const calculatedUserPots = []
  for (const tablePot of tablePots) {
    if (tablePot.id === EMPTY_POT_ID) continue

    const sameUserPot = userPots.find(userPot => isSamePotAndNotFolded(tablePot, userPot, table))
    if (sameUserPot) {
      calculatedUserPots.push(sameUserPot)
      pots.push({
        id: tablePot.id,
        seatIds: sameUserPot.seatIds,
        amount: tablePot.amount + sameUserPot.amount,
      })
    } else {
      pots.push(tablePot)
    }
  }

  for (const userPot of userPots) {
    if (calculatedUserPots.find(calcUserPot => isSamePot(calcUserPot, userPot))) continue

    pots.push(userPot)
  }

  return pots
}

const isThisInPotForFolderSeatId = (minimumInPot: number, newPlayingSeats: TypeSeat[]): number => {
  return (
    newPlayingSeats.find(s => {
      if (!s.user) return false
      if (s.user.cash.inPot !== minimumInPot) return false
      if (!s.user.isFold) return false

      return true
    })?.id || 0
  )
}

const getUserPots = (table: TypeTable): TypePot[] => {
  const playingSeats = getActiveSeats(table, true, true, false, false, false, false)

  const userPots: TypePot[] = []
  let newPlayingSeats = playingSeats
  let minimumInPot = getMinimumInPot(newPlayingSeats)
  let potId = 1
  let foldersSum = 0

  while (minimumInPot !== 0) {
    const thisInPotForFolderSeatId = isThisInPotForFolderSeatId(minimumInPot, newPlayingSeats)

    if (thisInPotForFolderSeatId) {
      foldersSum = foldersSum + minimumInPot
      newPlayingSeats = [...newPlayingSeats].filter(s => s.id !== thisInPotForFolderSeatId)
    } else {
      newPlayingSeats = [...newPlayingSeats]
        .filter(s => s.user && s.user.cash.inPot)
        .map(s => {
          if (!s.user) return s

          return {
            ...s,
            user: {
              ...s.user,
              cash: {
                ...s.user.cash,
                inPot: s.user.cash.inPot - minimumInPot,
              },
            },
          }
        })

      userPots.push({
        id: potId,
        seatIds: newPlayingSeats.filter(s => s.user && !s.user.isFold).map(s => s.id),
        amount: newPlayingSeats.length * minimumInPot + foldersSum,
      })
      foldersSum = 0
      potId++
    }
    minimumInPot = getMinimumInPot(newPlayingSeats)
  }

  return userPots
}

const getTablePots = (table: TypeTable): { tablePots: TypePot[]; extraBetUserPot: TypePot | null } => {
  const userPots = getUserPots(table)
  const mergedPots = getMergePots(userPots, table)

  return {
    // tablePots: mergedPots.filter(pot => pot.seatIds.length !== 1),
    tablePots: mergedPots,
    extraBetUserPot: null,
  }
}

export const getUpdatedTableIfPhaseFinished3 = (table: TypeTable, isPhaseFinished: boolean): TypeTable => {
  if (!isPhaseFinished) return table

  const atLeastTwoPlayers = isAtLeastTwoPlayers(table, false, false, false, false, false, false)
  const allPlayersAllIn = isAllPlayersAllIn(table)
  const tablePhase = calculateNewTablePhase(table, atLeastTwoPlayers, allPlayersAllIn)
  const { tablePots, extraBetUserPot } = getTablePots(table)
  const scoreAndAchievements = getScoreAndAchievements(table)

  const potsWithWinnerSeatIds = calculatePotsWithWinnerSeatIds(
    scoreAndAchievements,
    allPlayersAllIn,
    atLeastTwoPlayers,
    table,
    tablePhase,
    tablePots,
  )
  const hasWinner = potsWithWinnerSeatIds.length

  const showAchievements = atLeastTwoPlayers && hasWinner

  const finishedPhaseTable = {
    ...table,
    roleTurn: hasWinner ? null : table.roleTurn,
    phase: tablePhase,
    pots: tablePots,
    total: 0,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s

      const winnerPots = potsWithWinnerSeatIds.filter(pot => pot.winnerSeatIds.includes(s.id))
      const winnerPotIds = winnerPots.map(pot => pot.id)
      const winnerReward = winnerPots.reduce((sum, pot) => sum + pot.winnerReward, 0)

      const userCashInGame = winnerPotIds ? s.user.cash.inGame + winnerReward : s.user.cash.inGame

      const userAchievement = showAchievements ? scoreAndAchievements[s.id]?.achievement : ''
      const extraBetUser = extraBetUserPot?.seatIds?.includes(s.id) ? extraBetUserPot.amount : 0

      return {
        ...s,
        user: {
          ...s.user,
          cash: {
            ...s.user.cash,
            inPot: 0,
            inGame: userCashInGame + extraBetUser,
          },
          achievement: userAchievement,
          winnerPotIds,
          gameTurn: false,
          timer: null,
        },
      }
    }),
  }
  if (!hasWinner) {
    return finishedPhaseTable
  }

  const seatoutedAutoActionPlayersTable = getSeatoutedAutoActionPlayersTable(finishedPhaseTable)

  const timeToClearOrResetTableInShowPhase = isTimeToClearOrResetTableInShowPhase(seatoutedAutoActionPlayersTable)
  const timer = timeToClearOrResetTableInShowPhase ? getClearTableTimer() : getRestartTableTimer()

  return {
    ...seatoutedAutoActionPlayersTable,
    timer: potsWithWinnerSeatIds.length ? timer : null,
  }
}
