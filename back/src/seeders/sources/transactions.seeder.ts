import { TRANSACTIONS_REASONS } from 'src/configs/database'
import { Transaction } from 'src/models/transaction.entity'

export const TRANSACTIONS_SEEDER = [
  {
    id: 1,
    user_id: 1,
    price: 100,
    user_giving: true,
    description: 'buy in table 10 20 holdem',
    reason: TRANSACTIONS_REASONS.buyin,
    table_id: 1,
    bonus_code_id: 0,
  },
  {
    id: 2,
    user_id: 2,
    price: 300,
    user_giving: false,
    description: 'seatout table 10 20 holdem',
    reason: TRANSACTIONS_REASONS.leaveSeat,
    table_id: 1,
    bonus_code_id: 0,
  },
] as Transaction[]
