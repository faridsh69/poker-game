import { TypeCard, TypeScoreAndAchivement } from './types'
import { CARD_NUMBERS } from 'src/table/serverConstantsPoker'

// 9 Royal Flush
// 8 Straight Flush
// 7 quads = 7 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3
// 6 Full House = 6 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3
// 5 Flush
// 4 Straight
// 3 set = 3 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2
// 2 Two Pair = 2 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2
// 1 One Pair = 1 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2 + 14 * 100 ^ 1
// 0 High Card = 0 & 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2 + 14 * 100 ^ 1 + 14 * 100 ^ 0
export const getCardsScoreAndAchivement = (cards: TypeCard[]): TypeScoreAndAchivement => {
  let score = 0
  let level = 0
  const sortedCards = getSortedCards(cards)
  const pairOrSetOrQuadsCards = findPairOrSetOrQuadsCards(sortedCards)

  if (pairOrSetOrQuadsCards.length) {
    for (const pairOrSetOrQuadsCard of pairOrSetOrQuadsCards) {
      if (pairOrSetOrQuadsCard.length === 4) {
        level = Math.max(level, 7)
      }
      if (pairOrSetOrQuadsCard.length === 3) {
        level = Math.max(level, 3)
      }
      if (pairOrSetOrQuadsCard.length === 2) {
        if (level === 3) {
          level = Math.max(level, 6)
        }
        if (level === 1) {
          level = Math.max(level, 2)
        }
        level = Math.max(level, 1)
      }
    }
  }

  if (level === 0) {
    score = getHighCardScore(sortedCards)
  }
  if (level === 1) {
    score = getPairScore(sortedCards, pairOrSetOrQuadsCards)
  }
  if (level === 2) {
    score = getTwoPairScore(sortedCards, pairOrSetOrQuadsCards)
  }
  if (level === 3) {
    score = getSetScore(sortedCards, pairOrSetOrQuadsCards)
  }
  if (level === 4) {
    score = getStraightScore(sortedCards)
  }
  if (level === 4) {
    score = getFlushScore(sortedCards)
  }
  if (level === 6) {
    score = getFullHouseScore(sortedCards, pairOrSetOrQuadsCards)
  }
  if (level === 7) {
    score = getQuadsScore(sortedCards, pairOrSetOrQuadsCards)
  }
  if (level === 8) {
    score = getStraightFlushScore(sortedCards)
  }
  if (level === 9) {
    score = getRoyalFlushScore(sortedCards)
  }

  return { score, achievement: JSON.stringify({ score, pairs: pairOrSetOrQuadsCards }) }
}

const getRoyalFlushScore = (cards: TypeCard[]) => {
  return 9 * Math.pow(100, 5) + getCardScoreWithLevel(cards[0], 4)
}

const getStraightFlushScore = (cards: TypeCard[]) => {
  return 8 * Math.pow(100, 5) + getCardScoreWithLevel(cards[0], 4)
}

const getQuadsScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]) => {
  const quadsCards = pairOrSetOrQuadsCards[0]
  const restOfCards = cards.filter(
    c => !quadsCards.find(pc => pc.type === c.type && pc.number === c.number),
  )

  return (
    7 * Math.pow(100, 5) +
    getCardScoreWithLevel(quadsCards[0], 4) +
    getCardScoreWithLevel(restOfCards[0], 3)
  )
}

const getFullHouseScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]) => {
  const setCards = pairOrSetOrQuadsCards[0]
  const pairCards = pairOrSetOrQuadsCards[1]

  return (
    6 * Math.pow(100, 5) +
    getCardScoreWithLevel(setCards[0], 4) +
    getCardScoreWithLevel(pairCards[0], 3)
  )
}

const getFlushScore = (cards: TypeCard[]) => {
  return 5 * Math.pow(100, 5) + getCardScoreWithLevel(cards[0], 4)
}

const getStraightScore = (cards: TypeCard[]) => {
  return 4 * Math.pow(100, 5) + getCardScoreWithLevel(cards[0], 4)
}

const getSetScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]) => {
  const setCards = pairOrSetOrQuadsCards[0]
  const restOfCards = cards.filter(
    c => !setCards.find(pc => pc.type === c.type && pc.number === c.number),
  )

  return (
    3 * Math.pow(100, 5) +
    getCardScoreWithLevel(setCards[0], 4) +
    getCardScoreWithLevel(restOfCards[0], 3) +
    getCardScoreWithLevel(restOfCards[1], 2)
  )
}

const getTwoPairScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]) => {
  const pairCards1 = pairOrSetOrQuadsCards[0]
  const pairCards2 = pairOrSetOrQuadsCards[1]
  const restOfCards = cards.filter(
    c =>
      !pairCards1.find(pc => pc.type === c.type && pc.number === c.number) &&
      !pairCards2.find(pc => pc.type === c.type && pc.number === c.number),
  )

  return (
    2 * Math.pow(100, 5) +
    getCardScoreWithLevel(pairCards1[0], 4) +
    getCardScoreWithLevel(pairCards2[0], 3) +
    getCardScoreWithLevel(restOfCards[1], 2)
  )
}

const getPairScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]): number => {
  const pairCards = pairOrSetOrQuadsCards[0]
  const restOfCards = cards.filter(
    c => !pairCards.find(pc => pc.type === c.type && pc.number === c.number),
  )

  return (
    1 * Math.pow(100, 5) +
    getCardScoreWithLevel(pairCards[0], 4) +
    getCardScoreWithLevel(restOfCards[0], 3) +
    getCardScoreWithLevel(restOfCards[1], 2) +
    getCardScoreWithLevel(restOfCards[2], 1)
  )
}

const getHighCardScore = (cards: TypeCard[]) => {
  const highCardScore =
    0 * Math.pow(100, 5) +
    getCardScoreWithLevel(cards[0], 4) +
    getCardScoreWithLevel(cards[1], 3) +
    getCardScoreWithLevel(cards[2], 2) +
    getCardScoreWithLevel(cards[3], 1) +
    getCardScoreWithLevel(cards[4], 0)

  return highCardScore
}

const getCardScoreWithLevel = (card: TypeCard, level: number) => {
  const cardScore = getCardScore(card)
  const cardScoreWithLevel = cardScore * Math.pow(100, level)

  return cardScoreWithLevel
}

const getCardScore = (card: TypeCard) => {
  return Object.values(CARD_NUMBERS).findIndex(n => n === card.number) + 2
}

const getSortedCards = (cards: TypeCard[]): TypeCard[] => {
  const sortedCards = cards.sort((card1, card2) => {
    const card1Score = getCardScore(card1)
    const card2Score = getCardScore(card2)

    if (card1Score < card2Score) return 1
    if (card1Score > card2Score) return -1
    return 0
  })

  return sortedCards
}

const findPairOrSetOrQuadsCards = (cards: TypeCard[]): TypeCard[][] => {
  const usedCards: TypeCard[] = []
  const pairOrSetOrQuadsCards: TypeCard[][] = []

  for (const targetCard of cards) {
    usedCards.push(targetCard)
    const repeatedCards = [targetCard]

    for (const card of cards) {
      if (usedCards.find(uc => uc.type === card.type && uc.number === card.number)) {
        continue
      }

      if (card.number === targetCard.number) {
        repeatedCards.push(card)
        usedCards.push(card)
      }
    }

    if (repeatedCards.length > 1) {
      pairOrSetOrQuadsCards.push(repeatedCards)
    }
  }

  return pairOrSetOrQuadsCards
}
