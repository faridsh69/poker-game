import { User } from 'src/models/user.entity'
import { USERS_GENDERS, USERS_ROLES, USERS_STATUSES } from 'src/configs/database'

export const USERS_SEEDER = [
  {
    id: 1,
    username: 'sagtole',
    email: 'sag.tole@gmail.com',
    status: USERS_STATUSES.active,
    role: USERS_ROLES.admin,
    avatar_id: 2,
    phone: '00989123423322',
    first_name: 'javad',
    last_name: 'hashemi',
    gender: USERS_GENDERS.male,
    password: '1',
  },
  {
    id: 2,
    username: 'alihasani',
    email: 'ali.hasani@gmail.com',
    status: USERS_STATUSES.active,
    role: USERS_ROLES.admin,
    avatar_id: 3,
    phone: '00989123423322',
    first_name: 'ali',
    last_name: 'hasani',
    gender: USERS_GENDERS.male,
    password: '1',
  },
] as User[]
