import { CARD_NUMBERS, CARD_TYPES } from 'src/table/serverConstantsPoker'
import { TypeCard, TypeTable } from 'src/utils/types'

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
  let newSeatId = playerSeats[0].id
  let nextSeat = false

  for (const playerSeat of playerSeats) {
    if (nextSeat) {
      newSeatId = playerSeat.id
      break
    }

    if (playerSeat.id === seatId) {
      nextSeat = true
    }
  }

  return newSeatId
}

export const getCurrentGameTurnSeatId = (table: TypeTable, username: string) => {
  const currentGameTurnSeat = table.seats.find(s => s.user?.gameTurn)

  if (currentGameTurnSeat.user.username === username) {
    return currentGameTurnSeat.id
  }

  throw Error(`${currentGameTurnSeat.user.username} is acting when it's not his turn.`)
}

// export const makeUniqueArray = initialArray => {
//   const arrayOfJsons = initialArray.map(value => JSON.stringify(value))

//   return initialArray.filter(
//     (value, index) => arrayOfJsons.indexOf(JSON.stringify(value)) === index,
//   )
// }

// export const makeUniqueArrayByPropery = (initialArray, property) => {
//   const arrayOfProperty = initialArray.map(object => object[property])

//   return initialArray.filter((object, index) => arrayOfProperty.indexOf(object[property]) === index)
// }
