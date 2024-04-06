import { TABLE_PASOORS } from 'src/configs/serverPokerConstants'
import { Table } from 'src/models/table.entity'

export const TABLES_SEEDER = [
  {
    id: 3,
    title: 'Holdem 1$ 2$, Buy in: 100$ - 500$',
    pasoor: TABLE_PASOORS.holdem,
    blinds_small: 1,
    blinds_big: 2,
    buyin_min: 100,
    buyin_max: 500,
    seats: 6,
  },
  {
    id: 3,
    title: 'Holdem 5$ 10$, Buy in: 500$ - 1000$',
    pasoor: TABLE_PASOORS.holdem,
    blinds_small: 5,
    blinds_big: 10,
    buyin_min: 500,
    buyin_max: 2000,
    seats: 9,
  },
] as Table[]
