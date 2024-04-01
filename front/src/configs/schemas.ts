import * as yup from 'yup'

import { TypeModelFormKeys, TypeSchema } from 'src/interfaces'
import { SEAT_ROLES, TABLE_PASOORS, TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import {
  PAYMENTS_GATEWAYS,
  PAYMENTS_STATUSES,
  TRANSACTIONS_REASONS,
  USERS_GENDER_ENUM,
  USERS_ROLE_ENUM,
  USERS_STATUS_ENUM,
} from 'src/configs/forms'

const REGEXS = {
  alphabeticAndNumbers: /^[^!@#$%^&*+=<>:;|~]*$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]{4,16}$/g,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,30}$/,
}

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const USERS_SCHEMA = yup.object({
  username: yup
    .string()
    .required()
    .min(3, 'Username must have atleast 3 characters.')
    .matches(REGEXS.alphabeticAndNumbers, {
      message: 'Only alphabetic and number allowed.',
    }),
  first_name: yup.string().required().min(2, 'First name must have atleast 2 characters.'),
  last_name: yup.string().required().min(2, 'Last name must have atleast 2 characters.'),
  email: yup.string().required().email(),
  phone: yup
    .string()
    .transform(value => (!value ? null : value))
    .nullable()
    .matches(REGEXS.phone, 'Phone number is not valid'),
  status: yup.mixed<string>().oneOf(USERS_STATUS_ENUM).required(),
  role: yup.mixed<string>().oneOf(USERS_ROLE_ENUM).required(),
  gender: yup.mixed<string>().oneOf(USERS_GENDER_ENUM).required(),
  avatar_id: yup.number().required(),
  agent_percent: yup.number().required(),
  password: yup
    .string()
    .required()
    .matches(
      REGEXS.password,
      `Password must contain Minimum 4 and maximum 40 characters, 
    at least one uppercase letter, 
    one lowercase letter
    and one number`,
    ),
})

const PROFILE_SCHEMA = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone: yup
    .string()
    .transform(value => (!value ? null : value))
    .nullable()
    .matches(REGEXS.phone, 'Phone number is not valid'),
})

const TABLES_SCHEMA = yup.object({
  title: yup.string().required().min(3),
  pasoor: yup.mixed<string>().oneOf(Object.values(TABLE_PASOORS)).required(),
  blinds_small: yup.number().required(),
  blinds_big: yup.number().required(),
  buyin_min: yup.number().required(),
  buyin_max: yup.number().required(),
  seats: yup.number().required(),
})

const PAYMENTS_SCHEMA = yup.object({
  user_id: yup.number().required(),
  price: yup.number().required(),
  user_giving: yup.boolean().required(),
  description: yup.string().required(),
  gateway: yup.mixed<string>().oneOf(PAYMENTS_GATEWAYS).required(),
  status: yup.mixed<string>().oneOf(PAYMENTS_STATUSES).required(),
  wallet: yup.string().required(),
})

const DEPOSIT_SCHEMA = yup.object({
  price: yup.number().required(),
  description: yup.string().required(),
  gateway: yup.mixed<string>().oneOf(PAYMENTS_GATEWAYS).required(),
  wallet: yup.string().required(),
})

const WITHDRAW_SCHEMA = yup.object({
  price: yup.number().required(),
  description: yup.string().required(),
  gateway: yup.mixed<string>().oneOf(PAYMENTS_GATEWAYS).required(),
  wallet: yup.string().required(),
})

const TRANSACTIONS_SCHEMA = yup.object({
  user_id: yup.number().required(),
  price: yup.number().required(),
  user_giving: yup.boolean().required(),
  description: yup.string().required(),
  reason: yup.mixed<string>().oneOf(TRANSACTIONS_REASONS).required(),
  table_id: yup.number().required(),
  bonus_code_id: yup.number().required(),
})

const TRANSFER_SCHEMA = yup.object({
  username: yup
    .string()
    .required()
    .min(3, 'Username must have atleast 3 characters.')
    .matches(REGEXS.alphabeticAndNumbers, {
      message: 'Only alphabetic and number allowed.',
    }),
  price: yup.number().required(),
  description: yup.string().required(),
})

const HISTORIES_SCHEMA = yup.object({
  table_id: yup.number().required(),
  total: yup.number().required(),
  roleTurn: yup.mixed<string>().oneOf(Object.values(SEAT_ROLES)).required(),
  phase: yup.mixed<string>().oneOf(Object.values(TABLE_PHASES)).required(),
  seats: yup.string().required(),
  cards: yup.string().required(),
  pots: yup.string().required(),
})

export const MODEL_SCHEMAS: { [key in TypeModelFormKeys]: TypeSchema } = {
  register: LOGIN_SCHEMA,
  login: LOGIN_SCHEMA,
  profile: PROFILE_SCHEMA,
  users: USERS_SCHEMA,
  tables: TABLES_SCHEMA,
  payments: PAYMENTS_SCHEMA,
  transactions: TRANSACTIONS_SCHEMA,
  histories: HISTORIES_SCHEMA,
  deposit: DEPOSIT_SCHEMA,
  withdraw: WITHDRAW_SCHEMA,
  transfer: TRANSFER_SCHEMA,
}
