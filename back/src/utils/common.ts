import { CARD_NUMBERS, CARD_TYPES, TABLE_PHASES } from 'src/table/serverConstantsPoker'
import { TypeCard, TypeScoreAndAchivements, TypeTable, TypeTablePhase } from 'src/utils/types'
import { getCardsScoreAndAchivement } from './winnerAlghoritm'

export const isUndefined = variable => typeof variable === 'undefined'

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

export const getCurrentGameTurnSeatId = (table: TypeTable, username: string) => {
  const gameTurnSeatId = table.seats.find(s => s.user?.gameTurn)

  if (isUndefined(username) || gameTurnSeatId.user.username === username) {
    return gameTurnSeatId.id
  }

  throw Error(`${gameTurnSeatId.user.username} is acting when it's not his turn.`)
}

export const getCurrentDealerSeatId = (table: TypeTable): number => {
  const dealerSeat = table.seats.find(s => s.user?.isDealer)

  return dealerSeat?.id || 1
}

const getCurrentSmallSeatId = (table: TypeTable): number => {
  const currentDealerSeatId = getCurrentDealerSeatId(table)

  return getNextSeatId(table, currentDealerSeatId)
}

const getCurrentBigSeatId = (table: TypeTable) => {
  const smallSeatId = getCurrentSmallSeatId(table)

  return getNextSeatId(table, smallSeatId)
}

export const getNextSeatId = (table: TypeTable, seatId: number): number => {
  const playerSeats = table.seats.filter(s => s.user)
  let nextSeatId = playerSeats[0].id
  let foundSeat = false

  for (const playerSeat of playerSeats) {
    if (foundSeat) {
      nextSeatId = playerSeat.id
      break
    }

    if (playerSeat.id === seatId) {
      foundSeat = true
    }
  }

  return nextSeatId
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

const getMaximumBetSeatIds = (table: TypeTable): number[] => {
  const maximumBet = getMaximumBet(table)
  const maximumBetSeatIds: number[] = []

  for (const seat of table.seats) {
    if (!seat.user) continue

    if (seat.user.cash.inPot === maximumBet) {
      maximumBetSeatIds.push(seat.id)
    }
  }

  return maximumBetSeatIds
}

const getRaiserSeatId = (table: TypeTable) => {
  const maximumBetSeatIds = getMaximumBetSeatIds(table)
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table, undefined)
  let raiserSeatId = getNextSeatId(table, currentGameTurnSeatId)

  while (!maximumBetSeatIds.includes(raiserSeatId)) {
    raiserSeatId = getNextSeatId(table, raiserSeatId)
  }

  return raiserSeatId
}

export const getIsPhaseFinished = (table: TypeTable) => {
  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table, undefined)

  if (table.phase === TABLE_PHASES.preflop) {
    if (getMaximumBet(table) === table.big) {
      const currentBigSeatId = getCurrentBigSeatId(table)

      return currentBigSeatId === currentGameTurnSeatId
    }
  }

  const nextGameTurnSeatId = getNextSeatId(table, currentGameTurnSeatId)
  const raiserSeatId = getRaiserSeatId(table)

  return raiserSeatId === nextGameTurnSeatId
}

export const getNextTablePhase = (currentPhase: TypeTablePhase): TypeTablePhase => {
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

export const getScoreAndAchievements = (table: TypeTable): TypeScoreAndAchivements => {
  const tableCards = table.cards
  const scoreAndAchivements: TypeScoreAndAchivements = {}

  for (const seat of table.seats) {
    if (!seat.user) continue

    const userCards = seat.user.cards
    scoreAndAchivements[seat.id] = getCardsScoreAndAchivement([...tableCards, ...userCards])
  }

  return scoreAndAchivements
}

const getMaximumScore = (scoreAndAchievements: TypeScoreAndAchivements): number => {
  const seatIds = Object.keys(scoreAndAchievements)
  let maximumScore = 0

  for (const seatId of seatIds) {
    if (scoreAndAchievements[seatId].score > maximumScore) {
      maximumScore = scoreAndAchievements[seatId].score
    }
  }

  return maximumScore
}

export const getWinnerSeatIds = (scoreAndAchievements: TypeScoreAndAchivements) => {
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
