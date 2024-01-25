import {
  renderClientCallAction,
  renderClientCheckAction,
  renderClientFoldAction,
  renderClientRaiseAction,
  renderServerAutoCheckFold,
} from 'src/table/serverPokerControllers'
import {
  TypeAction,
  TypeCardNumber,
  TypeCardType,
  TypeClientChannelKeys,
  TypeClientChannels,
  TypeServerChannels,
  TypeTable,
  TypeTablePhase,
  TypeTableType,
  TypeTimerAction,
  TypeUser,
} from 'src/utils/serverPokerTypes'

export const KANIAT_PERCENT = 5

export const SERVER_TIMEOUT_EXTRA = 30
export const SERVER_TIMEOUT_ACTION = 15
export const SERVER_TIMEOUT_SEATOUT = 20

export const SERVER_TIMEOUT_RESTART = 7

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

export const ACTION_NAMES: { [key in TypeAction]: TypeAction } = {
  fold: 'fold',
  check: 'check',
  checkfold: 'checkfold',
  call: 'call',
  raise: 'raise',
}

export const TIMER_ACTION_NAMES: { [key in TypeTimerAction]: TypeTimerAction } = {
  leaveSeat: 'leaveSeat',
  checkfold: 'checkfold',
  restartTable: 'restartTable',
}

export const ACTIONS: {
  [key in TypeAction]: (tablesState: TypeTable[], tableId: number, amount?: number) => TypeTable[]
} = {
  fold: renderClientFoldAction,
  check: renderClientCheckAction,
  checkfold: renderServerAutoCheckFold,
  call: renderClientCallAction,
  raise: renderClientRaiseAction,
}

export const TABLE_PHASES: { [key in TypeTablePhase]: TypeTablePhase } = {
  wait: 'wait',
  preflop: 'preflop',
  flop: 'flop',
  turn: 'turn',
  river: 'river',
  show: 'show',
  finish: 'finish',
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
  timer: null,
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
  cards: [],
  isDealer: false,
  gameTurn: false,
  isWinner: false,
  achievement: '',
  isFold: false,
  isSeatout: false,
  timer: null,
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
    cards: [],
  },
  {
    id: 2,
    title: 'Holdem 5$ 10$, Buy in: 200$ - 2K$',
    type: TABLE_TYPES.holdem,
    blinds: {
      small: 5,
      big: 10,
    },
    buyin: {
      min: 200,
      max: 2000,
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
    cards: [],
  },
  {
    id: 3,
    title: 'Holdem 0.01$ 0.02$, Buy in: 5$ - 20K$',
    type: TABLE_TYPES.holdem,
    blinds: {
      small: 0.01,
      big: 0.02,
    },
    buyin: {
      min: 5,
      max: 20,
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
