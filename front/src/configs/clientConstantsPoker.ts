import {
  TypeCardNumber,
  TypeCardType,
  TypeTablePhase,
  TypeTableType,
} from 'src/interfaces/type-game'

export const SERVER_CHANNELS = {
  connect: 'connect',
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

export const TIMER_SECONDS = 20

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
