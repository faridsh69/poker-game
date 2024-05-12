import {
  TypeAction,
  TypeCardNumber,
  TypeCardType,
  TypeChannels,
  TypeSeatRole,
  TypeTablePasoor,
  TypeTablePhase,
  TypeTimerAction,
} from 'src/interfaces/type-game'

export const CLIENT_TIMEOUT_EXTRA = 30
export const CLIENT_TIMEOUT_ACTION = 15

export const CLIENT_TIMEOUT_SEATOUT_ALLIN = 20
export const CLIENT_TIMEOUT_SEATOUT = 20

export const DELAY_OEPN_MODAL = 15

export const CLIENT_TIMEOUT_STATUS = 3
export const CLIENT_TIMEOUT_FAULT = 55555

export const SERVER_CHANNELS = {
  connect: 'connect',
  updateTables: 'server:update_tables',
  exception: 'exception',
}

export const CLIENT_CHANNELS: TypeChannels = {
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

export const TIMER_ACTION_NAMES: { [key in TypeTimerAction]: TypeTimerAction } = {
  leaveSeat: 'leaveSeat',
  checkfold: 'checkfold',
  restartTable: 'restartTable',
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

export const TABLE_PASOORS: { [key in TypeTablePasoor]: TypeTablePasoor } = {
  holdem: 'holdem',
  omaha4: 'omaha4',
  omaha5: 'omaha5',
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

export const PRE_MOVED_VALUES = {
  checkFold: 'Check / Fold',
  check: 'Check',
  fold: 'Fold',
  call: 'Call',
}

export const LAST_ACTION_ACTIONS: { [key in TypeAction]: TypeAction } = {
  Check: 'Check',
  Call: 'Call',
  Raise: 'Raise',
  Fold: 'Fold',
  'All-In': 'All-In',
  checkfold: 'checkfold',
}

export const CHIP_UNITS = [
  {
    backgroundPosition: '-277px 0px',
    value: 250000,
  },
  {
    backgroundPosition: '-253px 0px',
    value: 50000,
  },
  {
    backgroundPosition: '-230px 0px',
    value: 10000,
  },
  {
    backgroundPosition: '-206px 0px',
    value: 2500,
  },
  {
    backgroundPosition: '-184px 0px',
    value: 500,
  },
  {
    backgroundPosition: '-161px 0px',
    value: 100,
  },
  {
    backgroundPosition: '-139px 0px',
    value: 25,
  },
  {
    backgroundPosition: '-115px 0px',
    value: 5,
  },
  {
    backgroundPosition: '-91px 0px',
    value: 1,
  },
  {
    backgroundPosition: '-69px 0px',
    value: 0.25,
  },
  {
    backgroundPosition: '-46px 0px',
    value: 0.05,
  },
  {
    backgroundPosition: '-23px 0px',
    value: 0.01,
  },
]

export const USER_CARD_CLASS_NAMES = {
  hide: 'user-card-hide',
  animatePass1: 'card-pass-animate-1',
  animatePass2: 'card-pass-animate-2',
  animateFold1: 'card-fold-animate-1',
  animateFold2: 'card-fold-animate-2',
  visible: 'user-card-visible',
}

export const USER_CARDS_SHOW_CLASS_NAME = ['', '']

export const USER_CARDS_HIDE_CLASS_NAME = [
  USER_CARD_CLASS_NAMES.hide,
  USER_CARD_CLASS_NAMES.hide,
  USER_CARD_CLASS_NAMES.hide,
  USER_CARD_CLASS_NAMES.hide,
  USER_CARD_CLASS_NAMES.hide,
]

export const USER_CARDS_FOLD_CLASS_NAME = [USER_CARD_CLASS_NAMES.animateFold1, USER_CARD_CLASS_NAMES.animateFold2]

export const ANIMATION_CSS_USER_CARD_DELAY = 300 // Dont change it
export const ANIMATION_CSS_USER_CARD_DURATION = 500 // Dont change it

export const ANIMATION_CSS_TABLE_CARD_DURATION = 500 // Dont change it

export const ANIMATION_CSS_POT_DURATION = 300 // Dont change it
export const ANIMATION_CSS_WIN_POT_DURATION = 6000 // Dont change it

export const TABLE_CARD_CLASS_NAMES = {
  hide: 'table-card-hide',
  flop1: 'table-card-flop-1',
  flop2: 'table-card-flop-2',
  flop3: 'table-card-flop-3',
  turn: 'table-card-turn',
  river: 'table-card-river',
}

export const TABLE_CARD_FLOP_CLASS_NAMES = [
  TABLE_CARD_CLASS_NAMES.flop1,
  TABLE_CARD_CLASS_NAMES.flop2,
  TABLE_CARD_CLASS_NAMES.flop3,
  TABLE_CARD_CLASS_NAMES.hide,
  TABLE_CARD_CLASS_NAMES.hide,
]

export const TABLE_CARD_TURN_CLASS_NAMES = ['', '', '', TABLE_CARD_CLASS_NAMES.turn, TABLE_CARD_CLASS_NAMES.hide]

export const TABLE_CARD_RIVER_CLASS_NAMES = ['', '', '', '', TABLE_CARD_CLASS_NAMES.river]
