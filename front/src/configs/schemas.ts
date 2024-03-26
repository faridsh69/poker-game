import * as yup from 'yup'
import { USERS_GENDER_ENUM, USERS_ROLE_ENUM, USERS_STATUS_ENUM } from './forms'

const REGEXS = {
  phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]{6,16}$/g,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/,
}

export const LOGIN_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export const USER_SCHEMA = yup.object({
  username: yup
    .string()
    .required()
    .min(3, 'Username must have atleast 3 characters.')
    .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
      message: 'Only alphabetic and number allowed.',
    }),
  first_name: yup.string().min(2, 'First name must have atleast 2 characters.'),
  last_name: yup.string().min(2, 'Last name must have atleast 2 characters.'),
  email: yup.string().email(),
  phone: yup.string().min(3, 'Phone must have atleast 6 characters.').nullable(),
  status: yup.mixed().oneOf(Object.values(USERS_STATUS_ENUM)).required(),
  role: yup.mixed().oneOf(Object.values(USERS_ROLE_ENUM)).required(),
  gender: yup.mixed().oneOf(Object.values(USERS_GENDER_ENUM)).required(),
  avatar_id: yup.number().required(),
  agent_percent: yup.number().required(),
  password: yup.string().matches(
    REGEXS.password,
    `Password must contain Minimum 8 and maximum 20 characters, 
  at least one uppercase letter, 
  one lowercase letter, 
  one number and 
  one special character`,
  ),
})

export const PROFILE_SCHEMA = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  birth_date: yup.string().required(),
  gender: yup.string().oneOf(['1', '0'], 'Select one option'),
  activated: yup.bool().oneOf([true], 'Field must be checked'),
  description: yup.string().nullable().min(10),
  email: yup.string().email().required(),
  phone: yup.string().matches(REGEXS.phone, 'Phone number is not valid'),
  national_code: yup.string().nullable().min(10).max(10),
  website: yup.string().nullable().url(),
})

export const MODEL_SCHEMAS = {
  users: USER_SCHEMA,
  login: LOGIN_SCHEMA,
  profile: PROFILE_SCHEMA,
}
