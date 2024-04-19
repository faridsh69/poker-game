export const DATABASE_CONFIG = {
  type: 'postgres' as 'aurora-mysql',
  host: 'localhost',
  port: 5432,
  password: '1',
  username: 'postgres',
  entities: [],
  database: 'per2',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  retryAttempts: 3,
}

export const USERS_STATUSES: { [key: string]: string } = {
  needConfirm: 'needConfirm',
  suspended: 'suspended',
  blocked: 'blocked',
  active: 'active',
}

export const USERS_ROLES: { [key: string]: string } = {
  player: 'player',
  agent: 'agent',
  admin: 'admin',
}

export const USERS_GENDERS: { [key: string]: string } = {
  male: 'male',
  female: 'female',
  unspecified: 'unspecified',
}

export const PAYMENTS_GATEWAYS: { [key: string]: string } = {
  btc: 'btc',
  usdt: 'usdt',
  perfectMoney: 'perfectMoney',
}

export const PAYMENTS_STATUSES: { [key: string]: string } = {
  pending: 'pending',
  reject: 'reject',
  success: 'success',
}

export const TRANSACTIONS_REASONS: { [key: string]: string } = {
  buyin: 'buyin',
  leaveSeat: 'leaveSeat',
  transfer: 'transfer',
  reward: 'reward',
  rakeBack: 'rakeBack',
  bonusCode: 'bonusCode',
}
