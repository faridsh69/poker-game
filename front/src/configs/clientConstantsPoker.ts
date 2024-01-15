import {
  TypeCardNumber,
  TypeCardType,
  TypeClientChannelKeys,
  TypeClientChannels,
  TypeTablePhase,
  TypeTableType,
} from 'src/interfaces/type-game'

export const USER_ACTION_THINKING_TIMEOUT_SECONDS = 15
export const SITOUT_TIMEOUT_SECONDS = 5 * 60

export const BUY_IN_MODAL_TIME_OUT_SECONDS = 30
export const SEAT_STATUS_DURATION_MILLISECOND = 3000

export const SERVER_CHANNELS = {
  connect: 'connect',
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
