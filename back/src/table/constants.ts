export const SERVER_CHANNELS = {
  updateTables: 'server:update_tables',
}

export const CLIENT_CHANNELS = {
  joinTable: 'client:join_table',
  leaveTable: 'client:leave_table',
  sitTable: 'client:sit_table',
}

const TABLE_TYPES = {
  holdem: 'HOLDEM',
  omaha: 'OMAHA',
}

const TABLE_STATUSES = {
  run: 'run',
  waiting: 'waiting',
}

const TABLE_PHASES = {
  preflop: 'preflop',
  flop: 'flop',
  turn: 'turn',
  river: 'river',
  show: 'show',
}

const USER_STATUSES = {
  run: 'run',
  waiting: 'waiting',
  sitout: 'sitout',
}

const CARD_TYPES = {
  diamonds: 'diamonds',
  clubs: 'clubs',
  spades: 'spades',
  hearts: 'hearts',
}

const CARD_NUMBERS = {
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

export const WAITING_USER = {
  id: 1,
  username: 'username',
  avatar: '/avatar.webp',
  cash: {
    out: 6500,
    inPot: 0,
    inGame: 0,
  },
  status: USER_STATUSES.waiting,
  hot: null,
  cards: [],
  isDealer: false,
}

export const PLAYING_USER = {
  id: 1,
  uuid: 'uuid-uuid-uuid-uuid',
  username: 'username',
  avatar: '/avatar.webp',
  cash: {
    out: 4500,
    inPot: 250,
    inGame: 1750,
  },
  status: USER_STATUSES.run,
  hot: 50,
  cards: [
    { type: CARD_TYPES.diamonds, number: CARD_NUMBERS.seven },
    { type: CARD_TYPES.hearts, number: CARD_NUMBERS.jack },
  ],
  isDealer: true,
}

export const TABLES = [
  {
    id: 1,
    title: 'Holdem 1$ 2$, Buy in: 100$ - 1K$',
    type: TABLE_TYPES.holdem,
    buyin: {
      min: 100,
      max: 1000,
    },
    small: 1,
    big: 2,
    status: TABLE_STATUSES.run,
    phase: TABLE_PHASES.flop,
    cards: [
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS.seven },
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS.eight },
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS.nine },
    ],
    waitingUsers: [WAITING_USER],
    seats: [
      {
        id: 1,
        user: PLAYING_USER,
      },
      {
        id: 2,
        user: null,
      },
      {
        id: 3,
        user: PLAYING_USER,
      },
      {
        id: 4,
        user: PLAYING_USER,
      },
    ],
  },
  {
    id: 2,
    title: 'Holdem 5$ 10$, Buy in: 500$ - 5K$',
    type: TABLE_TYPES.holdem,
    buyin: {
      min: 500,
      max: 5000,
    },
    small: 5,
    big: 10,
    status: TABLE_STATUSES.waiting,
    phase: null,
    cards: [],
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
  },
]
