import {
  CARD_NUMBERS,
  CARD_TYPES,
  KANIAT_PERCENT,
  TABLE_PHASES,
} from 'src/utils/serverPokerConstants'
import { getCardsScoreAndAchivement } from 'src/table/services/winnerService'
import {
  TypeCard,
  TypeScoreAndAchivements,
  TypeTable,
  TypeTablePhase,
} from 'src/utils/serverPokerTypes'

export const roundNumber = (number: number, digits = 2): number => {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

export const getTable = (tables: TypeTable[], tableId: number) => {
  return tables.find(t => t.id === tableId)
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

export const isShowOrFinishPhase = (table: TypeTable) => {
  return isShowPhase(table) || isFinishPhase(table)
}

const getActiveSeats = (table: TypeTable, includeFolders = false) => {
  return table.seats.filter(
    s =>
      s.user &&
      !s.user.isSeatout &&
      (!s.user.isFold || includeFolders) &&
      (isWaitPhase(table) || s.user.cards.length),
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

const getMaximumBet = (table: TypeTable) => {
  let maximumBet = -1
  const seats = getActiveSeats(table)

  for (const seat of seats) {
    if (seat.user.cash.inPot > maximumBet) {
      maximumBet = seat.user.cash.inPot
    }
  }

  return maximumBet
}

const getMaximumBetSeatIds = (table: TypeTable): number[] => {
  const maximumBet = getMaximumBet(table)
  const maximumBetSeatIds: number[] = []
  const seats = getActiveSeats(table)

  for (const seat of seats) {
    if (seat.user.cash.inPot === maximumBet) {
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
  let raiserSeatId = getNextSeatId(table, currentGameTurnSeatId)

  while (!maximumBetSeatIds.includes(raiserSeatId)) {
    raiserSeatId = getNextSeatId(table, raiserSeatId)
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
  const total = table.seats.filter(s => s.user).reduce((sum, s) => sum + s.user.cash.inPot, 0)

  return total + table.pot
}

export const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

const isAtLeastTwoPlayers = (table: TypeTable): boolean => {
  const seats = getActiveSeats(table)

  return seats.length > 1
}

const isAtLeastTwoNotSeatOutPlayers = (table: TypeTable): boolean => {
  const seats = table.seats.filter(s => s.user && !s.user.isSeatout)

  return seats.length > 1
}

const getOnlyPlayingSeatId = (table: TypeTable): number => {
  return table.seats.find(s => s.user && !s.user.isFold && !s.user.isSeatout)?.id || -1
}

export const isTimeToStartTable = (table: TypeTable): boolean => {
  const isWaitingOrFinishPhase = isWaitPhase(table) || isShowOrFinishPhase(table)

  const atLeastTwoPlayers = isAtLeastTwoNotSeatOutPlayers(table)

  return isWaitingOrFinishPhase && atLeastTwoPlayers
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

const getCurrentGameTurnSeatId = (table: TypeTable) => {
  return table.seats.find(s => s.user?.gameTurn)?.id || -1
}

export const getCurrentDealerSeatId = (table: TypeTable): number => {
  const dealerSeat = table.seats.find(s => s.user?.isDealer)

  if (dealerSeat) return dealerSeat?.id

  const seats = getActiveSeats(table, true)
  const randomSeatIndex = Math.floor(Math.random() * seats.length)

  return seats[randomSeatIndex].id
}

export const isGameHeadsUp = (table: TypeTable): boolean => {
  const seats = getActiveSeats(table)

  return seats.length === 2
}

export const getNextSeatId = (table: TypeTable, seatId: number, includeFolders = false): number => {
  const seats = getActiveSeats(table, includeFolders)

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

const getNextNotFoldedSeatId = (table: TypeTable, seatId: number) => {
  let nextGameTurnSeatId = getNextSeatId(table, seatId, true)

  while (table.seats.find(s => s.id === nextGameTurnSeatId).user.isFold) {
    nextGameTurnSeatId = getNextSeatId(table, seatId, true)
  }

  return nextGameTurnSeatId
}

export const getIsPhaseFinished = (table: TypeTable) => {
  const atLeastTwoPlayers = isAtLeastTwoPlayers(table)
  if (!atLeastTwoPlayers) return true

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
  const seats = getActiveSeats(table)

  for (const seat of seats) {
    const userCards = seat.user.cards
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

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)
  let nextGameTurnSeatId = getNextNotFoldedSeatId(table, currentGameTurnSeatId)

  if (isPhaseFinished) {
    nextGameTurnSeatId = getCurrentSmallSeatId(table)
  }

  return {
    ...table,
    total: getTableTotal(table),
    seats: table.seats.map(s => {
      if (!s.user) return s

      return {
        ...s,
        user: {
          ...s.user,
          gameTurn: nextGameTurnSeatId === s.id,
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

  const atLeastTwoPlayers = isAtLeastTwoPlayers(table)

  let tablePhase = getNextTablePhase(table.phase)
  const tablePot = getTableTotal(table)

  let scoreAndAchievements: TypeScoreAndAchivements = {}
  let winnerSeatIds: number[] = []
  let winnerReward = 0

  if (tablePhase === TABLE_PHASES.show) {
    scoreAndAchievements = getScoreAndAchievements(table)
    winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
  }

  if (!atLeastTwoPlayers) {
    tablePhase = TABLE_PHASES.finish
    winnerSeatIds = [getOnlyPlayingSeatId(table)]
  }

  if (winnerSeatIds.length) {
    winnerReward = roundNumber((tablePot / winnerSeatIds.length) * (1 - KANIAT_PERCENT / 100))
  }

  return {
    ...table,
    phase: tablePhase,
    pot: tablePot,
    seats: table.seats.map(s => {
      if (!s.user) return s

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
    seats: table.seats.map(s => {
      if (!s.user) return s

      return {
        ...s,
        user: {
          ...s.user,
          cards: [],
          gameTurn: false,
          isWinner: false,
          achievement: '',
          isFold: false,
        },
      }
    }),
  }
}
