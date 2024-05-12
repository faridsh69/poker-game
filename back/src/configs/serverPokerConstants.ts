import {
  TypeAction,
  TypeCardNumber,
  TypeCardType,
  TypeClientChannelKeys,
  TypeClientChannels,
  TypePot,
  TypeSeatRole,
  TypeServerChannels,
  TypeTablePasoor,
  TypeTablePhase,
  TypeTimerAction,
  TypeUser,
} from 'src/interfaces/serverPokerTypes'

export const KANIAT_PERCENT = 5

export const SERVER_TIMEOUT_EXTRA = 30
export const SERVER_TIMEOUT_ACTION = 1500 // 15

export const SERVER_TIMEOUT_SEATOUT_ALLIN = 600 // 120
export const SERVER_TIMEOUT_SEATOUT = 20

export const SERVER_TIMEOUT_RESTART = 10 // 10
export const SERVER_TIMEOUT_CLEAR = 6
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

export const USER_SEATOUT = {
  cards: [],
  winnerPotIds: [],
  achievement: '',
  isFold: false,
  isSeatout: true,
  isAutoAction: false,
  isTableClosed: false,
  isWaitForBB: false,
  isStradle: false,
  isSeatoutNextRound: false,
  timeBank: SERVER_TIMEOUT_EXTRA,
  // hot: null,
}

export const NEW_USER: TypeUser = {
  username: 'username',
  avatar_id: 1,
  cash: {
    inBank: 0,
    inGame: 0,
    inPot: 0,
  },
  timer: null,
  ...USER_SEATOUT,
}

export const EMPTY_POT_SEAT_IDS = [20]

export const EMPTY_POT: TypePot[] = [{ id: 1, amount: 0, seatIds: EMPTY_POT_SEAT_IDS }]

export const EMPTY_TABLE = {
  total: 0,
  phase: TABLE_PHASES.wait,
  pots: EMPTY_POT,
  cards: [],
  roleTurn: null,
  timer: null,
  waitingUsers: [],
}

export const NEW_TEST_TABLE = {
  ...EMPTY_TABLE,
  id: 1,
  title: 'title',
  pasoor: TABLE_PASOORS.holdem,
  blinds: { small: 1, big: 2 },
  buyin: { min: 100, max: 200 },
}

// export const TABLES: TypeTable[] = [
//   {
//     ...NEW_TABLE,
//     id: 1,
//     title: 'Holdem 5$ 10$, Buy in: 200$ - 2K$',
//     blinds: {
//       small: 5,
//       big: 10,
//     },
//     buyin: {
//       min: 200,
//       max: 2000,
//     },
//     seats: [
//       {
//         id: 1,
//         role: null,
//         user: null,
//       },
//       {
//         id: 2,
//         role: null,
//         user: null,
//       },
//       {
//         id: 3,
//         role: null,
//         user: null,
//       },
//       {
//         id: 4,
//         role: null,
//         user: null,
//       },
//       {
//         id: 5,
//         role: null,
//         user: null,
//       },
//       {
//         id: 6,
//         role: null,
//         user: null,
//       },
//     ],
//   },
// ]
