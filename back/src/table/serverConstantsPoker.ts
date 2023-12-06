import { TypeTable, TypeUser } from 'src/utils/types'

export const SERVER_CHANNELS = {
  updateTables: 'server:update_tables',
}

export const CLIENT_CHANNELS = {
  joinTable: 'client:join_table',
  leaveTable: 'client:leave_table',
  sitTable: 'client:sit_table',
  sitoutTable: 'client:sitout_table',
  checkAction: 'client:check_action',
  foldAction: 'client:fold_action',
  raiseAction: 'client:raise_action',
}

const TABLE_TYPES = {
  holdem: 'HOLDEM',
  omaha: 'OMAHA',
}

export const TABLE_PHASES = {
  wait: 'Wait',
  preflop: 'Preflop',
  flop: 'Flop',
  turn: 'Turn',
  river: 'River',
  show: 'Show',
}

// const USER_STATUSES = {
//   run: 'run',
//   waiting: 'waiting',
// }

export const CARD_TYPES = {
  diamonds: 'diamonds',
  clubs: 'clubs',
  spades: 'spades',
  hearts: 'hearts',
}

export const CARD_NUMBERS = {
  tow: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
  jack: 'J',
  queen: 'Q',
  king: 'K',
  ace: 'A',
}

export const WAITING_USER: TypeUser = {
  username: 'W8 player',
  avatar: '/avatar.webp',
  cash: {
    inBank: 10000,
    inGame: 0,
    inPot: 0,
  },
  cards: [],
  isDealer: false,
  gameTurn: false,
  // id: 1,
  // status: USER_STATUSES.waiting,
  // hot: null,
}

export const PLAYING_USER: TypeUser = {
  username: 'Active Player',
  avatar: '/avatar.webp',
  cash: {
    inBank: 7500,
    inGame: 2000,
    inPot: 500,
  },
  cards: [
    { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.seven },
    { type: CARD_TYPES.hearts, number: CARD_NUMBERS.jack },
  ],
  isDealer: false,
  gameTurn: false,
  // id: 1,
  // status: USER_STATUSES.run,
  // hot: 50,
}

export const TABLES: TypeTable[] = [
  {
    id: 1,
    title: 'Holdem 1$ 2$, Buy in: 100$ - 1K$',
    type: TABLE_TYPES.holdem,
    small: 1,
    big: 2,
    buyin: {
      min: 100,
      max: 1000,
    },
    waitingUsers: [WAITING_USER],
    seats: [
      {
        id: 1,
        user: PLAYING_USER,
      },
      {
        id: 2,
        user: PLAYING_USER,
      },
      {
        id: 3,
        user: null,
      },
      {
        id: 4,
        user: null,
      },
    ],
    phase: TABLE_PHASES.flop,
    cards: [
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS.seven },
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS.eight },
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS.nine },
    ],
  },
  {
    id: 2,
    title: 'Holdem 5$ 10$, Buy in: 500$ - 5K$',
    type: TABLE_TYPES.holdem,
    small: 5,
    big: 10,
    buyin: {
      min: 500,
      max: 5000,
    },
    waitingUsers: [],
    seats: [
      {
        id: 1,
        user: null,
      },
      {
        id: 2,
        user: null,
      },
      {
        id: 3,
        user: null,
      },
      {
        id: 4,
        user: null,
      },
    ],
    phase: TABLE_PHASES.wait,
    cards: [],
  },
]
