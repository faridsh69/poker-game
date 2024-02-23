import {
  TypeAction,
  TypeCardNumber,
  TypeCardType,
  TypeClientChannelKeys,
  TypeClientChannels,
  TypeSeatRole,
  TypeTablePhase,
  TypeTableType,
  TypeTimerAction,
} from 'src/interfaces/type-game'
export const ANIMATION_PASS_CARD_SPEED = 300
export const ANIMATION_CSS_DURATION = 500

export const CLIENT_TIMEOUT_EXTRA = 30
export const CLIENT_TIMEOUT_ACTION = 15

export const CLIENT_TIMEOUT_SEATOUT_ALLIN = 20
export const CLIENT_TIMEOUT_SEATOUT = 20

// export const CLIENT_TIMEOUT_QUIT = 4

export const CLIENT_TIMEOUT_STATUS = 3
export const CLIENT_TIMEOUT_FAULT = 55555

export const SERVER_CHANNELS = {
  connect: 'connect',
  updateTables: 'server:update_tables',
  exception: 'exception',
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

export const TABLE_TYPES: { [key in TypeTableType]: TypeTableType } = {
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
  ['All-In']: 'All-In',
  checkfold: 'checkfold',
}

export const CHIP_UNITS = [
  {
    backgroundPosition: '-277px 0px',
    value: 25000000,
  },
  {
    backgroundPosition: '-253px 0px',
    value: 5000000,
  },
  {
    backgroundPosition: '-230px 0px',
    value: 1000000,
  },
  {
    backgroundPosition: '-206px 0px',
    value: 250000,
  },
  {
    backgroundPosition: '-184px 0px',
    value: 50000,
  },
  {
    backgroundPosition: '-161px 0px',
    value: 10000,
  },
  {
    backgroundPosition: '-139px 0px',
    value: 2500,
  },
  {
    backgroundPosition: '-115px 0px',
    value: 500,
  },
  {
    backgroundPosition: '-91px 0px',
    value: 100,
  },
  {
    backgroundPosition: '-69px 0px',
    value: 25,
  },
  {
    backgroundPosition: '-46px 0px',
    value: 5,
  },
  {
    backgroundPosition: '-23px 0px',
    value: 1,
  },
]

export const CARD_CLASS_NAMES = {
  hide: 'card-hide',
  show: 'card-show',
  animatePass1: 'card-pass-animate-1',
  animatePass2: 'card-pass-animate-2',
  animateFold1: 'card-fold-animate-1',
  animateFold2: 'card-fold-animate-2',
}
