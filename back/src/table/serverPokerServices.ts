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

const getTablePot = (table: TypeTable) => {
  const maximumBet = getMaximumBet(table)
  const userSeats = table.seats.filter(s => s.user)
  const tablePot = table.pot + maximumBet * userSeats.length

  return tablePot
}

export const isUserSeatedTable = (table: TypeTable, username: string): boolean => {
  return !!table.seats.find(s => s.user?.username === username)
}

export const isUserWaitingTable = (table: TypeTable, username: string): boolean => {
  return !!table.waitingUsers.find(u => u.username === username)
}

export const isAtLeastTwoPlayers = (table: TypeTable): boolean => {
  return table.seats.filter(s => s.user && !s.user.isFold && !s.user.isSeatout).length > 1
}

export const getOnlyPlayingSeatId = (table: TypeTable): number => {
  return table.seats.find(s => s.user && !s.user.isFold && !s.user.isSeatout)?.id || -1
}

export const isTimeToStartTable = (table: TypeTable): boolean => {
  const isWaitingOrShowPhase =
    table.phase === TABLE_PHASES.wait || table.phase === TABLE_PHASES.show
  const atLeastTwoPlayers = isAtLeastTwoPlayers(table)

  return isWaitingOrShowPhase && atLeastTwoPlayers
}

export const isTimeToRestartTable = (tables: TypeTable[], tableId: number): boolean => {
  const table = tables.find(t => t.id === tableId)

  return table.phase === TABLE_PHASES.show
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

export const getCurrentGameTurnSeatId = (table: TypeTable) => {
  return table.seats.find(s => s.user?.gameTurn)?.id || -1
}

export const getCurrentDealerSeatId = (table: TypeTable): number => {
  const userSeats = table.seats.filter(s => s.user)
  const dealerSeat = userSeats.find(s => s.user.isDealer)

  return dealerSeat?.id || userSeats[0].id
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

export const getIsPhaseFinished = (table: TypeTable) => {
  const atLeastTwoPlayers = isAtLeastTwoPlayers(table)
  if (!atLeastTwoPlayers) return true

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)

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
    const tableAndUserCards = [...tableCards, ...userCards]
    scoreAndAchivements[seat.id] = getCardsScoreAndAchivement(tableAndUserCards)
  }

  return scoreAndAchivements
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

export const getUpdatedTableNextGameTurn = (table: TypeTable, isPhaseFinished: boolean) => {
  if (table.phase === TABLE_PHASES.show) return table

  const currentGameTurnSeatId = getCurrentGameTurnSeatId(table)
  let nextGameTurnSeatId = getNextSeatId(table, currentGameTurnSeatId)

  if (isPhaseFinished) {
    nextGameTurnSeatId = getCurrentSmallSeatId(table)
  }

  return {
    ...table,
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
      const inGame = s.user.cash.inGame - addedToPot

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
  const tablePot = getTablePot(table)

  let scoreAndAchievements: TypeScoreAndAchivements = {}
  let winnerSeatIds: number[] = []
  let winnerReward = 0

  if (tablePhase === TABLE_PHASES.show) {
    scoreAndAchievements = getScoreAndAchievements(table)
    winnerSeatIds = getWinnerSeatIds(scoreAndAchievements)
  }

  if (!atLeastTwoPlayers) {
    tablePhase = TABLE_PHASES.show
    winnerSeatIds = [getOnlyPlayingSeatId(table)]
  }

  if (winnerSeatIds.length) {
    winnerReward = (tablePot / winnerSeatIds.length) * (1 - KANIAT_PERCENT / 100)
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
