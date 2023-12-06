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

export const TABLE_PHASES = {
  wait: 'Wait',
  preflop: 'Preflop',
  flop: 'Flop',
  turn: 'Turn',
  river: 'River',
  show: 'Show',
}

export const TABLE_TYPES = {
  holdem: 'HOLDEM',
  omaha: 'OMAHA',
}
