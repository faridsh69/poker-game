import { SEAT_ROLES, TABLE_PHASES } from 'src/configs/serverPokerConstants'
import { History } from 'src/models/history.entity'

export const HISTORIES_SEEDER = [
  {
    id: 1,
    table_id: 1,
    total: 10,
    roleTurn: SEAT_ROLES.dealer,
    phase: TABLE_PHASES.turn,
    seats: JSON.stringify([]),
    cards: JSON.stringify([]),
    pots: JSON.stringify([]),
  },
] as History[]
