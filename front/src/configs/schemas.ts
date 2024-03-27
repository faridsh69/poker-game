import * as yup from 'yup'

import { USERS_GENDER_ENUM, USERS_ROLE_ENUM, USERS_STATUS_ENUM } from 'src/configs/forms'
import { TypeModelFormKeys, TypeSchema } from 'src/interfaces'

const REGEXS = {
  alphabeticAndNumbers: /^[^!@#$%^&*+=<>:;|~]*$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]{6,16}$/g,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,30}$/,
}

export const LOGIN_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export const USERS_SCHEMA = yup.object({
  username: yup
    .string()
    .required()
    .min(3, 'Username must have atleast 3 characters.')
    .matches(REGEXS.alphabeticAndNumbers, {
      message: 'Only alphabetic and number allowed.',
    }),
  first_name: yup.string().min(2, 'First name must have atleast 2 characters.'),
  last_name: yup.string().min(2, 'Last name must have atleast 2 characters.'),
  email: yup.string().email(),
  phone: yup.string().matches(REGEXS.phone, 'Phone number is not valid'),
  status: yup.mixed().oneOf(Object.values(USERS_STATUS_ENUM)).required(),
  role: yup.mixed().oneOf(Object.values(USERS_ROLE_ENUM)).required(),
  gender: yup.mixed().oneOf(Object.values(USERS_GENDER_ENUM)).required(),
  avatar_id: yup.number().required(),
  agent_percent: yup.number().required(),
  password: yup.string().matches(
    REGEXS.password,
    `Password must contain Minimum 4 and maximum 40 characters, 
    at least one uppercase letter, 
    one lowercase letter
    and one number`,
  ),
})

export const PROFILE_SCHEMA = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),

  email: yup.string().email().required(),
  phone: yup.string().matches(REGEXS.phone, 'Phone number is not valid'),

  password: yup.string().matches(
    REGEXS.password,
    `Password must contain Minimum 4 and maximum 40 characters, 
    at least one uppercase letter, 
    one lowercase letter
    and one number`,
  ),
})

export const MODEL_SCHEMAS: { [key in TypeModelFormKeys]: TypeSchema } = {
  register: LOGIN_SCHEMA,
  login: LOGIN_SCHEMA,
  // @ts-ignore
  profile: PROFILE_SCHEMA,
  // @ts-ignore
  users: USERS_SCHEMA,
}
