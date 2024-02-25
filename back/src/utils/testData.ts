import { CARD_NUMBERS, CARD_TYPES } from './serverPokerConstants'

export const royalFlushHand = [
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.a },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.j },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[3] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[4] },
]

export const StraightFlushHand = [
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.j },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[2] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[3] },
]

export const quadsHand = [
  // 71310000000
  { type: CARD_TYPES.spades, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[2] },
]

export const FullHand = [
  // 61013000000
  { type: CARD_TYPES.spades, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[4] },
]

// export const FlushHand = []

export const StraightHand = [
  { type: CARD_TYPES.spades, number: CARD_NUMBERS.a },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[8] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[5] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[2] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[4] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[3] },
]
