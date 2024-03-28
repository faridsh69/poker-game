export const DATABASE_CONFIG = {
  type: 'postgres' as 'aurora-mysql',
  host: 'localhost',
  port: 5432,
  password: '1',
  username: 'postgres',
  entities: [],
  database: 'per',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  retryAttempts: 3,
}

export const USERS_STATUS_ENUM: { [key: string]: string } = {
  needConfirm: 'needConfirm',
  suspended: 'suspended',
  blocked: 'blocked',
  active: 'active',
}

export const USERS_ROLE_ENUM: { [key: string]: string } = {
  player: 'player',
  agent: 'agent',
  admin: 'admin',
}

export const USERS_GENDER_ENUM: { [key: string]: string } = {
  male: 'male',
  female: 'female',
  unspecified: 'unspecified',
}
