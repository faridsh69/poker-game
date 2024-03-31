import { TABLE_PASOORS } from 'src/configs/serverPokerConstants'
import { Table } from 'src/models/table.entity'

export const TABLES_SEEDER = [
  {
    id: 3,
    title: 'Holdem 1$ 20$, Buy in: 100$ - 500$',
    pasoor: TABLE_PASOORS.holdem,
    blinds_small: 1,
    blinds_big: 2,
    buyin_min: 100,
    buyin_max: 500,
    seats: 6,
  },
] as Table[]
