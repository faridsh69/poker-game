import { CARD_NUMBERS, CARD_TYPES, TABLE_PHASES } from 'src/table/serverConstantsPoker'
import { TypeCard, TypeTable, TypeTablePhase } from 'src/utils/types'

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

export const getNewDealerSeatId = (table: TypeTable): number => {
  const playerSeats = table.seats.filter(s => s.user)
  let newDealerSeatId = playerSeats[0].id
  let nextOneIsDealer = false

  for (const playerSeat of playerSeats) {
    if (nextOneIsDealer) {
      newDealerSeatId = playerSeat.id
      break
    }

    if (playerSeat.user.isDealer) {
      nextOneIsDealer = true
    }
  }

  return newDealerSeatId
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

export const getCurrentGameTurnSeatId = (table: TypeTable, username: string) => {
  const currentGameTurnSeat = table.seats.find(s => s.user?.gameTurn)

  if (currentGameTurnSeat.user.username === username) {
    return currentGameTurnSeat.id
  }

  throw Error(`${currentGameTurnSeat.user.username} is acting when it's not his turn.`)
}

export const getIsPhaseTurnsFinished = (table: TypeTable) => {
  const currentGameTurnSeat = table.seats.find(s => s.user?.gameTurn)

  // @TODO if other users raise then this part should be updated
  return currentGameTurnSeat.user.isDealer
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
