import { PAYMENTS_GATEWAYS, PAYMENTS_STATUSES } from 'src/configs/database'
import { Payment } from 'src/models/payment.entity'

export const PAYMENTS_SEEDER = [
  {
    id: 1,
    user_id: 1,
    price: 1000,
    user_giving: true,
    description: 'Seeder transaction',
    gateway: PAYMENTS_GATEWAYS.usdt,
    status: PAYMENTS_STATUSES.reject,
    wallet: 'binance',
  },
  {
    id: 2,
    user_id: 2,
    price: 2000,
    user_giving: true,
    description: 'Seeder transaction',
    gateway: PAYMENTS_GATEWAYS.usdt,
    status: PAYMENTS_STATUSES.pending,
    wallet: 'binance',
  },
] as Payment[]
