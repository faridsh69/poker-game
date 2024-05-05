import { CARD_NUMBERS, PAIR_LENGTHESE, WINNER_LEVELS } from 'src/configs/serverPokerConstants'
import { TypeCard, TypeScoreAndAchivement } from 'src/interfaces/serverPokerTypes'

// 9 Royal Flush = 9 * 100 ^ 5
// 8 Straight Flush = 8 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2 + 14 * 100 ^ 1 + 14 * 100 ^ 0
// 7 quads = 7 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3
// 6 Full House = 6 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3
// 5 Flush = 5 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2 + 14 * 100 ^ 1 + 14 * 100 ^ 0
// 4 Straight = 4 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2 + 14 * 100 ^ 1 + 14 * 100 ^ 0
// 3 set = 3 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2
// 2 Two Pair = 2 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2
// 1 One Pair = 1 * 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2 + 14 * 100 ^ 1
// 0 High Card = 0 & 100 ^ 5 + 14 * 100 ^ 4 + 14 * 100 ^ 3 + 14 * 100 ^ 2 + 14 * 100 ^ 1 + 14 * 100 ^ 0
export const getCardsScoreAndAchivement = (cards: TypeCard[]): TypeScoreAndAchivement => {
  let score = 0
  let achievement = ''

  let level = WINNER_LEVELS.highCard
  const sortedCards = getSortedCards(cards)
  const pairOrSetOrQuadsCards = getPairOrSetOrQuadsCards(sortedCards)
  const flushCards = getFlushCards(sortedCards)
  const straightCards = getStraightCards(sortedCards)
  const straightFlushCards = getStraightCards(flushCards)

  if (pairOrSetOrQuadsCards.length) {
    for (const pairOrSetOrQuadsCard of pairOrSetOrQuadsCards) {
      if (pairOrSetOrQuadsCard.length === PAIR_LENGTHESE.quads) {
        level = Math.max(level, WINNER_LEVELS.quads)
      }
      if (pairOrSetOrQuadsCard.length === PAIR_LENGTHESE.set) {
        if (level === WINNER_LEVELS.onePair) {
          level = Math.max(level, WINNER_LEVELS.fullHouse)
        }
        level = Math.max(level, WINNER_LEVELS.set)
      }
      if (pairOrSetOrQuadsCard.length === PAIR_LENGTHESE.pair) {
        if (level === WINNER_LEVELS.set) {
          level = Math.max(level, WINNER_LEVELS.fullHouse)
        }
        if (level === WINNER_LEVELS.onePair) {
          level = Math.max(level, WINNER_LEVELS.twoPair)
        }
        level = Math.max(level, WINNER_LEVELS.onePair)
      }
    }
  }

  if (straightCards.length) {
    level = Math.max(level, WINNER_LEVELS.straight)
  }
  if (flushCards.length) {
    level = Math.max(level, WINNER_LEVELS.flush)
  }
  if (straightFlushCards.length) {
    level = Math.max(level, WINNER_LEVELS.straightFlush)
  }
  if (
    straightFlushCards.length &&
    getCardScore(straightFlushCards[0]) === getCardScore({ number: CARD_NUMBERS.a, type: 'hearts' })
  ) {
    level = Math.max(level, WINNER_LEVELS.royalFlush)
  }

  if (level === WINNER_LEVELS.highCard) {
    score = getHighCardScore(sortedCards)
    achievement = getHighCardAchievement(sortedCards)
  } else if (level === WINNER_LEVELS.onePair) {
    score = getPairScore(sortedCards, pairOrSetOrQuadsCards)
    achievement = getPairAchievement(pairOrSetOrQuadsCards)
  } else if (level === WINNER_LEVELS.twoPair) {
    score = getTwoPairScore(sortedCards, pairOrSetOrQuadsCards)
    achievement = getTwoPairAchievement(pairOrSetOrQuadsCards)
  } else if (level === WINNER_LEVELS.set) {
    score = getSetScore(sortedCards, pairOrSetOrQuadsCards)
    achievement = getSetAchievement(pairOrSetOrQuadsCards)
  } else if (level === WINNER_LEVELS.straight) {
    score = getStraightScore(straightCards)
    achievement = getStraightAchievement(straightCards)
  } else if (level === WINNER_LEVELS.flush) {
    score = getFlushScore(flushCards)
    achievement = getFlushAchievement(flushCards)
  } else if (level === WINNER_LEVELS.fullHouse) {
    score = getFullHouseScore(pairOrSetOrQuadsCards)
    achievement = getFullHouseAchievement(pairOrSetOrQuadsCards)
  } else if (level === WINNER_LEVELS.quads) {
    score = getQuadsScore(sortedCards, pairOrSetOrQuadsCards)
    achievement = getQuadsAchievement(pairOrSetOrQuadsCards)
  } else if (level === WINNER_LEVELS.straightFlush) {
    score = getStraightFlushScore(straightFlushCards)
    achievement = getStraightFlushAchievement(straightFlushCards)
  } else if (level === WINNER_LEVELS.royalFlush) {
    score = getRoyalFlushScore()
    achievement = getRoyalFlushAchievement()
  }

  return { score, achievement }
}

const getRoyalFlushScore = (): number => {
  return WINNER_LEVELS.royalFlush * Math.pow(100, 5)
}

const getRoyalFlushAchievement = (): string => {
  return 'royal flush'
}

const getStraightFlushScore = (straightFlushCards: TypeCard[]): number => {
  return WINNER_LEVELS.straightFlush * Math.pow(100, 5) + getCardScoreWithLevel(straightFlushCards[0], 4)
}

const getStraightFlushAchievement = (straightFlushCards: TypeCard[]): string => {
  return `straigh flush, ${straightFlushCards[4].number.toUpperCase()} to ${straightFlushCards[0].number.toUpperCase()}`
}

const getQuadsScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]): number => {
  const quadsCards = pairOrSetOrQuadsCards[0]
  const restOfCards = cards.filter(c => !quadsCards.find(pc => pc.type === c.type && pc.number === c.number))

  return (
    WINNER_LEVELS.quads * Math.pow(100, 5) +
    getCardScoreWithLevel(quadsCards[0], 4) +
    getCardScoreWithLevel(restOfCards[0], 3)
  )
}

const getQuadsAchievement = (pairOrSetOrQuadsCards: TypeCard[][]): string => {
  const quadsCards = pairOrSetOrQuadsCards[0]

  return `four of a kind, ${quadsCards[0].number.toUpperCase()}s`
}

const getFullHouseScore = (pairOrSetOrQuadsCards: TypeCard[][]): number => {
  const setCards = pairOrSetOrQuadsCards[0]
  const pairCards = pairOrSetOrQuadsCards[1]

  return (
    WINNER_LEVELS.fullHouse * Math.pow(100, 5) +
    getCardScoreWithLevel(setCards[0], 4) +
    getCardScoreWithLevel(pairCards[0], 3)
  )
}

const getFullHouseAchievement = (pairOrSetOrQuadsCards: TypeCard[][]) => {
  const setCards = pairOrSetOrQuadsCards[0]
  const pairCards = pairOrSetOrQuadsCards[1]

  return `full house, ${setCards[0].number.toUpperCase()}s full of ${pairCards[0].number.toUpperCase()}s`
}

const getFlushScore = (flushCards: TypeCard[]) => {
  return (
    WINNER_LEVELS.flush * Math.pow(100, 5) +
    getCardScoreWithLevel(flushCards[0], 4) +
    getCardScoreWithLevel(flushCards[1], 3) +
    getCardScoreWithLevel(flushCards[2], 2) +
    getCardScoreWithLevel(flushCards[3], 1) +
    getCardScoreWithLevel(flushCards[4], 0)
  )
}

const getFlushAchievement = (flushCards: TypeCard[]): string => {
  return `flush ${flushCards[0].number.toUpperCase()} high`
}

const getStraightScore = (straightCards: TypeCard[]): number => {
  return (
    WINNER_LEVELS.straight * Math.pow(100, 5) +
    getCardScoreWithLevel(straightCards[0], 4) +
    getCardScoreWithLevel(straightCards[1], 3) +
    getCardScoreWithLevel(straightCards[2], 2) +
    getCardScoreWithLevel(straightCards[3], 1) +
    getCardScoreWithLevel(straightCards[4], 0)
  )
}

const getStraightAchievement = (straightCards: TypeCard[]): string => {
  return `straight ${straightCards[4].number.toUpperCase()} to ${straightCards[0].number.toUpperCase()}`
}

const getSetScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]): number => {
  const setCards = pairOrSetOrQuadsCards[0]
  const restOfCards = cards.filter(c => !setCards.find(pc => pc.type === c.type && pc.number === c.number))

  return (
    WINNER_LEVELS.set * Math.pow(100, 5) +
    getCardScoreWithLevel(setCards[0], 4) +
    getCardScoreWithLevel(restOfCards[0], 3) +
    getCardScoreWithLevel(restOfCards[1], 2)
  )
}

const getSetAchievement = (pairOrSetOrQuadsCards: TypeCard[][]): string => {
  const setCards = pairOrSetOrQuadsCards[0]

  return `three of a kind, ${setCards[0].number.toUpperCase()}s`
}

const getTwoPairScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]): number => {
  const pairCards1 = pairOrSetOrQuadsCards[0]
  const pairCards2 = pairOrSetOrQuadsCards[1]
  const restOfCards = cards.filter(
    c =>
      !pairCards1.find(pc => pc.type === c.type && pc.number === c.number) &&
      !pairCards2.find(pc => pc.type === c.type && pc.number === c.number),
  )

  return (
    WINNER_LEVELS.twoPair * Math.pow(100, 5) +
    getCardScoreWithLevel(pairCards1[0], 4) +
    getCardScoreWithLevel(pairCards2[0], 3) +
    getCardScoreWithLevel(restOfCards[0], 2)
  )
}

const getTwoPairAchievement = (pairOrSetOrQuadsCards: TypeCard[][]): string => {
  const pairCards1 = pairOrSetOrQuadsCards[0]
  const pairCards2 = pairOrSetOrQuadsCards[1]

  return `two pair, ${pairCards1[0].number.toUpperCase()}s and ${pairCards2[0].number.toUpperCase()}s`
}

const getPairScore = (cards: TypeCard[], pairOrSetOrQuadsCards: TypeCard[][]): number => {
  const pairCards = pairOrSetOrQuadsCards[0]
  const restOfCards = cards.filter(c => !pairCards.find(pc => pc.type === c.type && pc.number === c.number))

  return (
    WINNER_LEVELS.onePair * Math.pow(100, 5) +
    getCardScoreWithLevel(pairCards[0], 4) +
    getCardScoreWithLevel(restOfCards[0], 3) +
    getCardScoreWithLevel(restOfCards[1], 2) +
    getCardScoreWithLevel(restOfCards[2], 1)
  )
}

const getPairAchievement = (pairOrSetOrQuadsCards: TypeCard[][]): string => {
  const pairCards = pairOrSetOrQuadsCards[0]

  return `pair of ${pairCards[0].number.toUpperCase()}s`
}

const getHighCardScore = (cards: TypeCard[]): number => {
  const highCardScore =
    WINNER_LEVELS.highCard * Math.pow(100, 5) +
    getCardScoreWithLevel(cards[0], 4) +
    getCardScoreWithLevel(cards[1], 3) +
    getCardScoreWithLevel(cards[2], 2) +
    getCardScoreWithLevel(cards[3], 1) +
    getCardScoreWithLevel(cards[4], 0)

  return highCardScore
}

const getHighCardAchievement = (cards: TypeCard[]): string => {
  return `high card ${cards[0].number.toUpperCase()}`
}

const getCardScoreWithLevel = (card: TypeCard, level: number) => {
  const cardScore = getCardScore(card)
  const cardScoreWithLevel = cardScore * Math.pow(100, level)

  return cardScoreWithLevel
}

const getCardScore = (card: TypeCard): number => {
  return Object.keys(CARD_NUMBERS).findIndex(n => n === card.number) + 2
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

const getPairOrSetOrQuadsCards = (cards: TypeCard[]): TypeCard[][] => {
  const usedCards: TypeCard[] = []
  const pairOrSetOrQuadsCards: TypeCard[][] = []

  for (const targetCard of cards) {
    usedCards.push(targetCard)
    const sameNumberCards = [targetCard]

    for (const card of cards) {
      if (usedCards.find(uc => uc.type === card.type && uc.number === card.number)) {
        continue
      }

      if (card.number === targetCard.number) {
        sameNumberCards.push(card)
        usedCards.push(card)
      }
    }

    if (sameNumberCards.length > 1) {
      pairOrSetOrQuadsCards.push(sameNumberCards)
    }
  }

  pairOrSetOrQuadsCards.sort(function (p1, p2) {
    return p2.length - p1.length
  })

  return pairOrSetOrQuadsCards
}

const getStraightCards = (cards: TypeCard[]): TypeCard[] => {
  const cardScores = cards.map(c => getCardScore(c))
  if (cardScores.includes(14)) {
    cardScores.push(1)
  }

  let straightCards: TypeCard[] = []

  for (const cardScore of cardScores) {
    const nextScore1 = cardScores.find(cs => cs === cardScore - 1)
    const nextScore2 = cardScores.find(cs => cs === cardScore - 2)
    const nextScore3 = cardScores.find(cs => cs === cardScore - 3)
    const nextScore4 = cardScores.find(cs => cs === cardScore - 4)

    if (nextScore1 && nextScore2 && nextScore3 && nextScore4) {
      const aceScoreStraighAceToFive = cardScore - 4 !== 1 ? cardScore - 4 : 14
      straightCards = [
        cards.find(c => getCardScore(c) === cardScore) as TypeCard,
        cards.find(c => getCardScore(c) === cardScore - 1) as TypeCard,
        cards.find(c => getCardScore(c) === cardScore - 2) as TypeCard,
        cards.find(c => getCardScore(c) === cardScore - 3) as TypeCard,
        cards.find(c => getCardScore(c) === aceScoreStraighAceToFive) as TypeCard,
      ]
      break
    }
  }

  return straightCards
}

const getFlushCards = (cards: TypeCard[]): TypeCard[] => {
  const usedCards: TypeCard[] = []
  let flushCards: TypeCard[] = []

  for (const targetCard of cards) {
    usedCards.push(targetCard)
    const sameTypeCards = [targetCard]

    for (const card of cards) {
      if (usedCards.find(uc => uc.type === card.type && uc.number === card.number)) {
        continue
      }

      if (card.type === targetCard.type) {
        sameTypeCards.push(card)
        usedCards.push(card)
      }
    }

    if (sameTypeCards.length > 4) {
      flushCards = sameTypeCards
    }
  }

  return flushCards
}
