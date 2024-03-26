// import { AuroraMysqlConnectionCredentialsOptions } from 'typeorm/driver/aurora-mysql/AuroraMysqlConnectionCredentialsOptions'

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

export const USERS_STATUS_ENUM = ['needConfirm', 'suspended', 'blocked', 'active']

export const USERS_ROLE_ENUM = ['player', 'agent', 'admin']

export const USERS_GENDER_ENUM = ['male', 'female', 'unspecified']
