import {
  TypeCardNumber,
  TypeCardType,
  TypeClientChannelKeys,
  TypeClientChannels,
  TypeServerChannels,
  TypeTable,
  TypeTablePhase,
  TypeTableType,
  TypeUser,
} from 'src/utils/serverPokerTypes'

export const KANIAT_PERCENT = 5

export const START_NEW_ROUND_TIMEOUT = 8000

export const USER_ACTION_THINKING_TIMEOUT = 10000

export const SERVER_CHANNELS: { [key: string]: TypeServerChannels } = {
  updateTables: 'server:update_tables',
}

export const CLIENT_CHANNELS: { [key in TypeClientChannelKeys]: TypeClientChannels } = {
  joinTable: 'client:join_table',
  leaveTable: 'client:leave_table',

  joinSeat: 'client:join_seat',
  leaveSeat: 'client:leave_seat',

  joinGame: 'client:join_game',
  leaveGame: 'client:leave_game',

  foldAction: 'client:fold_action',
  checkAction: 'client:check_action',
  callAction: 'client:call_action',
  raiseAction: 'client:raise_action',
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

export const WINNER_LEVELS = {
  highCard: 0,
  onePair: 1,
  twoPair: 2,
  set: 3,
  straight: 4,
  flush: 5,
  fullHouse: 6,
  quads: 7,
  straightFlush: 8,
  royalFlush: 9,
}

export const WAITING_USER: TypeUser = {
  username: 'W8 player',
  avatar: '1',
  cash: {
    inBank: 10000,
    inGame: 0,
    inPot: 0,
  },
  cards: [],
  isDealer: false,
  gameTurn: false,
  isWinner: false,
  achievement: '',
  isFold: false,
  isSeatout: true,
  // hot: null,
}

export const PLAYING_USER: TypeUser = {
  username: 'Active Player',
  avatar: '2',
  cash: {
    inBank: 7500,
    inGame: 2500,
    inPot: 0,
  },
  cards: [
    // { type: CARD_TYPES.spades, number: CARD_NUMBERS.k },
    // { type: CARD_TYPES.hearts, number: CARD_NUMBERS.a },
    // { type: CARD_TYPES.spades, number: CARD_NUMBERS[10] },
    // { type: CARD_TYPES.clubs, number: CARD_NUMBERS.a },
  ],
  isDealer: false,
  gameTurn: false,
  isWinner: false,
  achievement: '',
  isFold: false,
  isSeatout: false,
  // hot: 50,
}

export const TABLES: TypeTable[] = [
  {
    id: 1,
    title: 'Holdem 1$ 2$, Buy in: 100$ - 1K$',
    type: TABLE_TYPES.holdem,
    blinds: {
      small: 1,
      big: 2,
    },
    buyin: {
      min: 100,
      max: 1000,
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
      {
        id: 5,
        user: null,
      },
      {
        id: 6,
        user: null,
      },
    ],
    phase: TABLE_PHASES.wait,
    pot: 0,
    total: 0,
    cards: [
      { type: CARD_TYPES.diamonds, number: CARD_NUMBERS[10] },
      { type: CARD_TYPES.clubs, number: CARD_NUMBERS.j },
      { type: CARD_TYPES.hearts, number: CARD_NUMBERS.q },
    ],
  },
  {
    id: 2,
    title: 'Holdem 5$ 10$, Buy in: 500$ - 5K$',
    type: TABLE_TYPES.holdem,
    blinds: {
      small: 5,
      big: 10,
    },
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
      {
        id: 5,
        user: null,
      },
      {
        id: 6,
        user: null,
      },
      {
        id: 7,
        user: null,
      },
      {
        id: 8,
        user: null,
      },
      {
        id: 9,
        user: null,
      },
    ],
    phase: TABLE_PHASES.wait,
    pot: 0,
    total: 0,
    cards: [],
  },
]
