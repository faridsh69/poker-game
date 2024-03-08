import {
  TypeAction,
  TypeCardNumber,
  TypeCardType,
  TypeClientChannelKeys,
  TypeClientChannels,
  TypePot,
  TypeSeatRole,
  TypeServerChannels,
  TypeTable,
  TypeTablePasoor,
  TypeTablePhase,
  TypeTimerAction,
  TypeUser,
} from 'src/utils/serverPokerTypes'

export const KANIAT_PERCENT = 5

export const SERVER_TIMEOUT_EXTRA = 30
export const SERVER_TIMEOUT_ACTION = 15

export const SERVER_TIMEOUT_SEATOUT_ALLIN = 600 // 120
export const SERVER_TIMEOUT_SEATOUT = 20

export const SERVER_TIMEOUT_RESTART = 10
export const SERVER_TIMEOUT_CLEAR = 4
export const SERVER_TIMEOUT_START = 0

export const SERVER_CHANNELS: { [key: string]: TypeServerChannels } = {
  updateTables: 'server:update_tables',
}

export const CLIENT_CHANNELS: { [key in TypeClientChannelKeys]: TypeClientChannels } = {
  joinTable: 'client:join_table',
  leaveTable: 'client:leave_table',

  joinSeat: 'client:join_seat',
  leaveSeat: 'client:leave_seat',

  joinGame: 'client:join_game',
  waitForBB: 'client:wait_for_bb',
  leaveGame: 'client:leave_game',

  foldAction: 'client:fold_action',
  checkAction: 'client:check_action',
  callAction: 'client:call_action',
  raiseAction: 'client:raise_action',

  timeBankAction: 'client:timebank_action',
  showCardAction: 'client:showcard_action',

  stradle: 'client:stradle',
  seatoutNextRound: 'client:seatout_next_round',
}

export const TABLE_PASOORS: { [key in TypeTablePasoor]: TypeTablePasoor } = {
  holdem: 'holdem',
  omaha4: 'omaha4',
  omaha5: 'omaha5',
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
  clearTable: 'clearTable',
}

export const SEAT_ROLES: { [key in TypeSeatRole]: TypeSeatRole } = {
  dealer: 'dealer',
  small: 'small',
  big: 'big',
  underTheGun4: 'underTheGun4',
  underTheGunPlusOne5: 'underTheGunPlusOne5',
  underTheGunPlusTwo6: 'underTheGunPlusTwo6',
  lowJack7: 'lowJack7',
  highJack8: 'highJack8',
  cutOff9: 'cutOff9',
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

export const PAIR_LENGTHESE = {
  pair: 2,
  set: 3,
  quads: 4,
}

export const NEW_USER: TypeUser = {
  username: '',
  avatar: '',
  cash: {
    inBank: 0,
    inGame: 0,
    inPot: 0,
  },
  cards: [],
  winnerPotIds: [],
  achievement: '',
  isFold: false,
  isSeatout: false,
  isAutoAction: false,
  isTableClosed: false,
  isWaitForBB: false,
  isStradle: false,
  isSeatoutNextRound: false,
  timer: null,
  timeBank: SERVER_TIMEOUT_EXTRA,
  // hot: null,
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
  winnerPotIds: [],
  achievement: '',
  isFold: false,
  isSeatout: false,
  isAutoAction: false,
  isTableClosed: false,
  isWaitForBB: false,
  isStradle: false,
  isSeatoutNextRound: false,
  timer: null,
  timeBank: SERVER_TIMEOUT_EXTRA,
  // hot: null,
}

export const SEATOUT_USER = {
  cards: [],
  winnerPotIds: [],
  achievement: '',
  isFold: false,
}

export const EMPTY_POT: TypePot[] = [{ id: 1, amount: 0, seatIds: [1, 2, 3, 4, 5, 6, 7, 8, 9] }]

export const TABLES: TypeTable[] = [
  {
    id: 1,
    title: 'Holdem 1$ 2$, Buy in: 100$ - 1K$',
    pasoor: TABLE_PASOORS.omaha4,
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
        role: null,
        user: null,
      },
      {
        id: 2,
        role: null,
        user: null,
      },
      {
        id: 3,
        role: null,
        user: null,
      },
      {
        id: 4,
        role: null,
        user: null,
      },
      {
        id: 5,
        role: null,
        user: null,
      },
      {
        id: 6,
        role: null,
        user: null,
      },
    ],
    phase: TABLE_PHASES.wait,
    pots: EMPTY_POT,
    total: 0,
    cards: [],
    roleTurn: null,
    timer: null,
  },
  {
    id: 2,
    title: 'Holdem 5$ 10$, Buy in: 200$ - 2K$',
    pasoor: TABLE_PASOORS.holdem,
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
        role: null,
        user: null,
      },
      {
        id: 2,
        role: null,
        user: null,
      },
      {
        id: 3,
        role: null,
        user: null,
      },
      {
        id: 4,
        role: null,
        user: null,
      },
      {
        id: 5,
        role: null,
        user: null,
      },
      {
        id: 6,
        role: null,
        user: null,
      },
    ],
    phase: TABLE_PHASES.wait,
    pots: EMPTY_POT,
    total: 0,
    cards: [],
    roleTurn: null,
    timer: null,
  },
  {
    id: 3,
    title: 'Holdem 0.01$ 0.02$, Buy in: 5$ - 20K$',
    pasoor: TABLE_PASOORS.omaha5,
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
        role: null,
        user: null,
      },
      {
        id: 2,
        role: null,
        user: null,
      },
      {
        id: 3,
        role: null,
        user: null,
      },
      {
        id: 4,
        role: null,
        user: null,
      },
      {
        id: 5,
        role: null,
        user: null,
      },
      {
        id: 6,
        role: null,
        user: null,
      },
      {
        id: 7,
        role: null,
        user: null,
      },
      {
        id: 8,
        role: null,
        user: null,
      },
      {
        id: 9,
        role: null,
        user: null,
      },
    ],
    phase: TABLE_PHASES.wait,
    pots: EMPTY_POT,
    total: 0,
    cards: [],
    roleTurn: null,
    timer: null,
  },
]
