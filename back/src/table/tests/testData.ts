import { CARD_NUMBERS, CARD_TYPES, NEW_USER, NEW_TABLE } from '../../utils/serverPokerConstants'
import { TypeTable } from '../../utils/serverPokerTypes'
import { getIsPhaseFinished2 } from '../serverPokerServices'
import { getCardsScoreAndAchivement } from '../services/winnerService'

export const runTests = () => {
  console.log('3-1 getIsPhaseFinished2 ', getIsPhaseFinished2(TestTableIsPhaseFinished))
  return
  console.log('1-1 getCardsScoreAndAchivement TestRoyalFlushHand', getCardsScoreAndAchivement(TestRoyalFlushHand))
  console.log('1-2 getCardsScoreAndAchivement TestStraightFlushHand', getCardsScoreAndAchivement(TestStraightFlushHand))
  console.log('1-3 getCardsScoreAndAchivement TestQuadsHand', getCardsScoreAndAchivement(TestQuadsHand))
  console.log('1-4 getCardsScoreAndAchivement TestFullHand', getCardsScoreAndAchivement(TestFullHand))
  console.log('1-5 getCardsScoreAndAchivement TestStraightHand', getCardsScoreAndAchivement(TestStraightHand))
  console.log('1-6 getCardsScoreAndAchivement TestTwoPair', getCardsScoreAndAchivement(TestTwoPair))

  // console.log('2-1 tablePots TestSeperatePotTable', getTablePots(TestSeperatePotTable).tablePots)
  return
}

const TestTableIsPhaseFinished: TypeTable = {
  ...NEW_TABLE,
  seats: [
    {
      id: 3,
      role: 'dealer',
      user: {
        ...NEW_USER,
        username: 'kianaz',
        cash: {
          inPot: 100,
          inGame: 0,
          inBank: 0,
        },
      },
    },
    {
      id: 4,
      role: 'small',
      user: {
        ...NEW_USER,
        username: 'farid',
        cash: {
          inPot: 100,
          inGame: 100,
          inBank: 0,
        },
      },
    },
    {
      id: 5,
      role: 'big',
      user: {
        ...NEW_USER,
        username: 'sanazi',
        cash: {
          inPot: 100,
          inGame: 100,
          inBank: 0,
        },
      },
    },
  ],
}

const TestRoyalFlushHand = [
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.a },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.j },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[3] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[4] },
]

const TestStraightFlushHand = [
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.j },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[2] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[3] },
]

const TestQuadsHand = [
  // 71310000000
  { type: CARD_TYPES.spades, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS.k },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[10] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[2] },
]

const TestFullHand = [
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

const TestStraightHand = [
  { type: CARD_TYPES.spades, number: CARD_NUMBERS.a },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.q },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[8] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[5] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[2] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[4] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[3] },
]

const TestTwoPair = [
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS[8] },
  { type: CARD_TYPES.hearts, number: CARD_NUMBERS[8] },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS[4] },
  { type: CARD_TYPES.clubs, number: CARD_NUMBERS['j'] },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS[9] },
  { type: CARD_TYPES.spades, number: CARD_NUMBERS[4] },
  { type: CARD_TYPES.diamonds, number: CARD_NUMBERS[6] },
]

// const TestSeperatePotTable: TypeTable = {
//   id: 1,
//   title: 't',
//   pasoor: 'holdem',
//   blinds: { small: 1, big: 2 },
//   buyin: { min: 1, max: 2 },
//   waitingUsers: [],
//   total: 0,
//   pots: [{ id: 1, amount: 300, seatIds: [1, 2, 3] }],
//   seats: [
//     {
//       id: 1,
//       role: 'dealer',
//       user: {
//         ...NEW_USER,
//         isFold: false,
//         cash: {
//           inPot: 100,
//           inGame: 100,
//           inBank: 0,
//         },
//       },
//     },
//     {
//       id: 2,
//       role: 'small',
//       user: {
//         ...NEW_USER,
//         isFold: true,
//         cash: {
//           inPot: 50,
//           inGame: 350,
//           inBank: 0,
//         },
//       },
//     },
//     {
//       id: 3,
//       role: 'big',
//       user: {
//         ...NEW_USER,
//         isFold: false,
//         cash: {
//           inPot: 100,
//           inGame: 600,
//           inBank: 0,
//         },
//       },
//     },
//   ],
// }
