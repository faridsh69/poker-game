import {
  TypeCardNumber,
  TypeCardType,
  TypeClientChannels,
  TypeServerChannels,
  TypeTable,
  TypeTablePhase,
  TypeTableType,
  TypeUser,
} from 'src/utils/types'

export const SERVER_CHANNELS: { [key: string]: TypeServerChannels } = {
  updateTables: 'server:update_tables',
}

export const CLIENT_CHANNELS: { [key: string]: TypeClientChannels } = {
  joinTable: 'client:join_table',
  leaveTable: 'client:leave_table',
  sitTable: 'client:sit_table',
  sitoutTable: 'client:sitout_table',
  checkAction: 'client:check_action',
  callAction: 'client:call_action',
  raiseAction: 'client:raise_action',
  foldAction: 'client:fold_action',
}

const TABLE_TYPES: { [key in TypeTableType]: TypeTableType } = {
  holdem: 'holdem',
  omaha: 'omaha',
}

export const TABLE_PHASES: { [key in TypeTablePhase]: TypeTablePhase } = {
  wait: 'wait',
  preflop: 'preflop',
  flop: 'flop',
  turn: 'turn',
  river: 'river',
  show: 'show',
}

export const CARD_TYPES: { [key in TypeCardType]: TypeCardType } = {
  diamonds: 'diamonds',
  clubs: 'clubs',
  spades: 'spades',
  hearts: 'hearts',
}

export const CARD_NUMBERS: { [key in TypeCardNumber]: TypeCardNumber } = {
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  j: 'j',
  q: 'q',
  k: 'k',
  a: 'a',
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
    { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.q },
    { type: CARD_TYPES.hearts, number: CARD_NUMBERS.j },
  ],
  isDealer: false,
  gameTurn: false,
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
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS[7] },
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS[8] },
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS[9] },
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
