// @ts-nocheck
import { CARD_NUMBERS, CARD_TYPES } from './serverPokerConstants'
import { TypeTable } from './serverPokerTypes'

export const TestRoyalFlushHand = [
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.a },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.j },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[3] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[4] },
]

export const TestStraightFlushHand = [
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.j },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[2] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[3] },
]

export const TestQuadsHand = [
  // 71310000000
  { type: CARD_TYPES.spades, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[2] },
]

export const TestFullHand = [
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

export const TestStraightHand = [
  { type: CARD_TYPES.spades, number: CARD_NUMBERS.a },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[8] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[5] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[2] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[4] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[3] },
]

export const TestTwoPair = [
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[8] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[8] },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS[4] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS['j'] },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[4] },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS[6] },
]

export const TestSeperatePotTable: TypeTable = {
  id: 1,
  title: 't',
  pasoor: 'holdem',
  blinds: { small: 1, big: 2 },
  buyin: { min: 1, max: 2 },
  waitingUsers: [],
  total: 0,
  pots: [
    { id: 1, amount: 300, seatIds: [1, 2, 3] },
    // { id: 2, amount: 100, seatIds: [1, 2, 3, 4] },
  ],
  seats: [
    {
      id: 1,
      role: 'kianaz',
      user: {
        isSeatout: false,
        isFold: false,
        cards: [{}],
        cash: {
          inPot: 100,
          inGame: 100,
          inBank: 1000,
        },
      },
    },
    {
      id: 2,
      role: 'farid',
      user: {
        cards: [{}],
        isSeatout: false,
        isFold: true,
        cash: {
          inPot: 50,
          inGame: 350,
          inBank: 1000,
        },
      },
    },
    {
      id: 3,
      role: 'sanaz',
      user: {
        isSeatout: false,
        isFold: false,
        cards: [{}],
        cash: {
          inPot: 100,
          inGame: 600,
          inBank: 1000,
        },
      },
    },
  ],
}
