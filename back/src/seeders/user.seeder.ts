import { User } from 'src/models/user.entity'
import { USERS_GENDER_ENUM, USERS_ROLE_ENUM, USERS_STATUS_ENUM } from 'src/configs/database'

export const SEEDER_USERS = [
  {
    id: 1,
    username: 'sagtole',
    email: 'sag.tole@gmail.com',
    status: USERS_STATUS_ENUM[3],
    role: USERS_ROLE_ENUM[2],
    avatar_id: 2,
    phone: '00989123423322',
    first_name: 'javad',
    last_name: 'hashemi',
    gender: USERS_GENDER_ENUM[0],
    password: '1',
  },
  {
    id: 2,
    username: 'alihasani',
    email: 'ali.hasani@gmail.com',
    status: USERS_STATUS_ENUM[3],
    role: USERS_ROLE_ENUM[2],
    avatar_id: 2,
    phone: '00989123423322',
    first_name: 'ali',
    last_name: 'hasani',
    gender: USERS_GENDER_ENUM[0],
    password: '1',
  },
] as User[]
