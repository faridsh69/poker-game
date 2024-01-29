import {
  CARD_NUMBERS,
  CARD_TYPES,
  KANIAT_PERCENT,
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
  TypeTable,
  TypeTablePhase,
  TypeTimer,
} from 'src/utils/serverPokerTypes'

export const roundNumber = (number: number, digits = 2): number => {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

export const getDeadline = (timeout = 0) => {
  return Math.floor(new Date().valueOf() / 1000) + timeout
}

export const getTable = (tables: TypeTable[], tableId: number): TypeTable => {
  return tables.find(t => t.id === tableId) as TypeTable
}

export const isWaitPhase = (table: TypeTable) => {
  return table.phase === TABLE_PHASES.wait
}

const isPreflopPhase = (table: TypeTable) => {
  return table.phase === TABLE_PHASES.preflop
}

const isShowPhase = (table: TypeTable) => {
  return table.phase === TABLE_PHASES.show
}

const isFinishPhase = (table: TypeTable) => {
  return table.phase === TABLE_PHASES.finish
}

const isShowOrFinishPhase = (table: TypeTable) => {
  return isShowPhase(table) || isFinishPhase(table)
}

const isSeatoutSeat = (seat: TypeSeat) => {
  return !!seat.user?.isSeatout
}

const isFoldSeat = (seat: TypeSeat) => {
  return !!seat.user?.isFold
}

const isAllinSeat = (seat: TypeSeat) => {
  return !seat.user?.cash.inGame
}

const isNotEnoughCashThanBlinds = (seat: TypeSeat, table: TypeTable): boolean => {
  if (!seat.user) return true

  return seat.user?.cash?.inGame < table.blinds.big
}

const getActiveSeats = (table: TypeTable, includeFolders = false, includeAllIns = false) => {
  return table.seats.filter(
    s =>
      s.user &&
      !isSeatoutSeat(s) &&
      (isWaitPhase(table) || s.user.cards.length) &&
      (!isAllinSeat(s) || includeAllIns) &&
      (!isFoldSeat(s) || includeFolders),
  )
}

const getCurrentSmallSeatId = (table: TypeTable): number => {
  const currentDealerSeatId = getCurrentDealerSeatId(table)

  return getNextSeatId(table, currentDealerSeatId)
}

const getCurrentBigSeatId = (table: TypeTable) => {
  const smallSeatId = getCurrentSmallSeatId(table)

  return getNextSeatId(table, smallSeatId)
}

export const isTimeToStartTable = (table: TypeTable) => {
  return isWaitPhase(table) && isAtLeastTwoPlayers(table, true, false)
}

export const isTimeToClearTableInMiddleOfGame = (table: TypeTable) => {
  return !isWaitPhase(table) && !isAtLeastTwoPlayers(table, true, true)
}

export const isTimeToClearTableInShowPhase = (table: TypeTable) => {
  return !isAtLeastTwoPlayers(table, true, false)
}

export const getLeaveSeatTimer = (isAllin = false): TypeTimer => {
  return {
    deadline: getDeadline(isAllin ? SERVER_TIMEOUT_SEATOUT_ALLIN : SERVER_TIMEOUT_SEATOUT),
    action: TIMER_ACTION_NAMES.leaveSeat,
  }
}

const getCheckfoldtimer = () => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_ACTION),
    action: TIMER_ACTION_NAMES.checkfold,
  }
}

const getExtraCheckfoldtimer = (time: number): TypeTimer => {
  return {
    deadline: getDeadline(time),
    action: TIMER_ACTION_NAMES.checkfold,
    extra: 10,
  }
}

export const getStartTableTimer = (): TypeTimer => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_START),
    action: TIMER_ACTION_NAMES.restartTable,
  }
}

const getRestartTableTimer = (): TypeTimer => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_RESTART),
    action: TIMER_ACTION_NAMES.restartTable,
  }
}

export const getClearTableTimer = (): TypeTimer => {
  return {
    deadline: getDeadline(SERVER_TIMEOUT_CLEAR),
    action: TIMER_ACTION_NAMES.clearTable,
  }
}

const getMaximumBet = (table: TypeTable) => {
  let maximumBet = -1
  const seats = getActiveSeats(table, false, true)

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
  const seats = getActiveSeats(table, false, true)

  for (const seat of seats) {
    if (seat.user && seat.user.cash.inPot === maximumBet) {
      maximumBetSeatIds.push(seat.id)
    }
  }

  return maximumBetSeatIds
}

const getRaiserSeatId = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)

  if (maximumBet === 0) {
    return getCurrentSmallSeatId(table)
  }

  const maximumBetSeatIds = getMaximumBetSeatIds(table)
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)
  let raiserSeatId = getNextSeatId(table, currentGameTurnSeatId, false, true)
  let repeat = table.seats.length
  while (!maximumBetSeatIds.includes(raiserSeatId) && repeat >= 0) {
    raiserSeatId = getNextSeatId(table, raiserSeatId)
    repeat = repeat - 1
  }

  return raiserSeatId
}

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

const getTableTotal = (table: TypeTable) => {
  const total = table.seats
    .filter(s => s.user)
    .reduce((sum, s) => {
      if (!s.user) return sum

      return sum + s.user.cash.inPot
    }, 0)

  return total + table.pot
}

export const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const isAtLeastTwoPlayers = (
  table: TypeTable,
  includeFolders = false,
  includeAllIns = false,
): boolean => {
  const seats = getActiveSeats(table, includeFolders, includeAllIns)

  return seats.length > 1
}

const isAllPlayersAllIn = (table: TypeTable): boolean => {
  const inGameSeats = table.seats.filter(
    s =>
      s.user && !isSeatoutSeat(s) && !s.user.isFold && (isWaitPhase(table) || s.user.cards.length),
  )

  if (inGameSeats.length < 2) return false

  return inGameSeats.filter(s => !isAllinSeat(s)).length < 2
}

const getOnlyPlayingSeatId = (table: TypeTable): number => {
  return table.seats.find(s => s.user && !s.user.isFold && !isSeatoutSeat(s))?.id || -1
}

export const isCheckAllowed = (table: TypeTable) => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)
  const maximumBetSeatIds = getMaximumBetSeatIds(table)

  return maximumBetSeatIds.includes(currentGameTurnSeatId)
}

export const getRandomCards = (cardsCount: number, usedCards: TypeCard[]) => {
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

const getCurrentGameTurnSeatId = (table: TypeTable): number => {
  return table.seats.find(s => s.user?.gameTurn)?.id || -1
}

export const getCurrentGameTurnUsername = (table: TypeTable) => {
  return table.seats.find(s => s.user?.gameTurn)?.user?.username || 'No Username'
}

export const getCurrentDealerSeatId = (table: TypeTable): number => {
  const dealerSeat = table.seats.find(s => s.user?.isDealer)
  // @TTODO add dealer to seat not to user

  if (dealerSeat) return dealerSeat?.id

  const seats = getActiveSeats(table, true, true)
  const randomSeatIndex = Math.floor(Math.random() * seats.length)

  return seats[randomSeatIndex].id
}

export const isGameHeadsUp = (table: TypeTable): boolean => {
  const seats = getActiveSeats(table, true, true)

  return seats.length === 2
}

export const getNextSeatId = (
  table: TypeTable,
  seatId: number,
  includeFolders = false,
  includeAllIns = false,
): number => {
  const seats = getActiveSeats(table, includeFolders, includeAllIns)

  if (!seats.length) {
    return seatId
  }

  let nextSeatId = seats[0].id
  let foundSeat = false

  for (const seat of seats) {
    if (foundSeat) {
      nextSeatId = seat.id
      break
    }

    if (seat.id === seatId) {
      foundSeat = true
    }
  }

  return nextSeatId
}

const getNextNotFoldedOrAllinSeatId = (table: TypeTable, isPhaseFinished: boolean) => {
  if (isPhaseFinished) {
    return getCurrentSmallSeatId(table)
  }
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  const seats = getActiveSeats(table, true, true)
  const acceptableSeats = getActiveSeats(table, false, false)

  if (!acceptableSeats.length) {
    console.log('acceptableSeats BUG')
    return currentGameTurnSeatId
  }

  let nextSeatId = acceptableSeats[0].id
  let foundSeat = false

  for (const seat of seats) {
    if (foundSeat) {
      if (isAllinSeat(seat)) continue
      if (isFoldSeat(seat)) continue

      nextSeatId = seat.id
      break
    }

    if (seat.id === currentGameTurnSeatId) {
      foundSeat = true
    }
  }

  return nextSeatId
}

export const getIsPhaseFinished = (table: TypeTable) => {
  if (!isAtLeastTwoPlayers(table, false, false)) return true

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  if (isPreflopPhase(table)) {
    if (getMaximumBet(table) === table.blinds.big) {
      const currentBigSeatId = getCurrentBigSeatId(table)

      return currentBigSeatId === currentGameTurnSeatId
    }
  }

  const nextGameTurnSeatId = getNextSeatId(table, currentGameTurnSeatId, true)
  const raiserSeatId = getRaiserSeatId(table)

  return raiserSeatId === nextGameTurnSeatId
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

const getScoreAndAchievements = (table: TypeTable): TypeScoreAndAchivements => {
  const tableCards = table.cards
  const scoreAndAchivements: TypeScoreAndAchivements = {}
  const seats = getActiveSeats(table, false, true)

  for (const seat of seats) {
    const userCards = seat.user?.cards || []
    const tableAndUserCards = [...tableCards, ...userCards]
    scoreAndAchivements[seat.id] = getCardsScoreAndAchivement(tableAndUserCards)
  }

  return scoreAndAchivements
}

const getWinnerSeatIds = (scoreAndAchievements: TypeScoreAndAchivements) => {
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

export const getUpdatedTableNextGameTurn = (table: TypeTable, isPhaseFinished: boolean) => {
  if (isShowOrFinishPhase(table)) return table

  const nextGameTurnSeatId = getNextNotFoldedOrAllinSeatId(table, isPhaseFinished)

  return {
    ...table,
    total: getTableTotal(table),
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s

      return {
        ...s,
        user: {
          ...s.user,
          gameTurn: nextGameTurnSeatId === s.id,
          timer: nextGameTurnSeatId === s.id ? getCheckfoldtimer() : null,
        },
      }
    }),
  }
}

export const getUpdatedSeatWithFold = (table: TypeTable) => {
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

export const getUpdatedSeatWithRaiseOrCallAmount = (table: TypeTable, amount: number) => {
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

export const getUpdatedTableIfPhaseFinished = (table: TypeTable, isPhaseFinished: boolean) => {
  if (!isPhaseFinished) return table

  let tablePhase = getNextTablePhase(table.phase)
  const tablePot = getTableTotal(table)

  let scoreAndAchievements: TypeScoreAndAchivements = {}
  let winnerSeatIds: number[] = []
  let winnerReward = 0

  if (tablePhase === TABLE_PHASES.show) {
    scoreAndAchievements = getScoreAndAchievements(table)
    winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
  }

  const atLeastTwoPlayers = isAtLeastTwoPlayers(table, false, false)

  if (!atLeastTwoPlayers) {
    tablePhase = TABLE_PHASES.finish
    winnerSeatIds = [getOnlyPlayingSeatId(table)]
  }

  const allPlayersAllIn = isAllPlayersAllIn(table)

  if (allPlayersAllIn) {
    tablePhase = TABLE_PHASES.show
    scoreAndAchievements = getScoreAndAchievements(table)
    winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
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

  const timer = isTimeToClearTableInShowPhase(finishedPhaseTable)
    ? getClearTableTimer()
    : getRestartTableTimer()

  return {
    ...finishedPhaseTable,
    timer: winnerReward ? timer : null,
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
}

export const clearTable = (table: TypeTable): TypeTable => {
  return {
    ...table,
    phase: TABLE_PHASES.wait,
    pot: 0,
    total: 0,
    cards: [],
    timer: null,
    seats: table.seats.map(s => {
      if (!s.user) return s

      const isAllin = isAllinSeat(s)

      return {
        ...s,
        user: {
          ...s.user,
          cards: [],
          gameTurn: false,
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

export const resetTable = (table: TypeTable): TypeTable => {
  const tableCards = getRandomCards(5, [])
  let usedCards = [...tableCards]

  const currentDealerSeatId = getCurrentDealerSeatId(table)
  const newDealerSeatId = getNextSeatId(table, currentDealerSeatId, true)
  // const newSmallSeatId = isGameHeadsUp(t) ? newDealerSeatId : getNextSeatId(t, newDealerSeatId)
  const newSmallSeatId = getNextSeatId(table, newDealerSeatId, true)
  const newBigSeatId = getNextSeatId(table, newSmallSeatId, true)
  const newGameTurnSeatId = getNextSeatId(table, newBigSeatId, true)

  return {
    ...table,
    pot: 0,
    phase: TABLE_PHASES.preflop,
    total: table.blinds.small + table.blinds.big,
    cards: tableCards,
    timer: null,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s

      const userCards = getRandomCards(2, usedCards)
      usedCards = [...usedCards, ...userCards]

      const addedToPot =
        newSmallSeatId === s.id ? table.blinds.small : newBigSeatId === s.id ? table.blinds.big : 0
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
          timer: newGameTurnSeatId === s.id ? getCheckfoldtimer() : null,
        },
      }
    }),
  }
}

export const getUpdatedSeatWithTimeBank = (table: TypeTable) => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

  return {
    ...table,
    seats: table.seats.map(s => {
      if (!s.user) return s
      if (isSeatoutSeat(s)) return s
      if (!s.user.timer) return s
      if (currentGameTurnSeatId !== s.id) return s

      console.log('33 s.user.timeBank', s.user.timeBank)
      console.log('34 s.user.timer.deadline', s.user.timer.deadline)
      const extraTimer = getExtraCheckfoldtimer(
        s.user.timeBank + (s.user.timer.deadline - getDeadline(0)),
      )
      console.log('35 extraTimer', extraTimer)
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
