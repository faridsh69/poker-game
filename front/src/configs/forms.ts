import { SelectController } from 'src/components/organisms/admin/controllers/SelectController'
import { TypeFormInput } from 'src/interfaces'

export const USERS_STATUS_ENUM = ['needConfirm', 'suspended', 'blocked', 'active']

export const USERS_ROLE_ENUM = ['player', 'agent', 'admin']

export const USERS_GENDER_ENUM = ['male', 'female', 'unspecified']

export const USER_FORM: TypeFormInput[] = [
  {
    name: 'username',
  },
  {
    name: 'email',
    type: 'email',
  },
  {
    name: 'status',
    component: SelectController,
    options: USERS_STATUS_ENUM,
  },
  {
    name: 'role',
    component: SelectController,
    options: USERS_ROLE_ENUM,
  },
  {
    name: 'phone',
  },
  {
    name: 'first_name',
  },
  {
    name: 'last_name',
  },
  {
    name: 'gender',
    component: SelectController,
    options: USERS_GENDER_ENUM,
  },
  {
    name: 'avatar_id',
    type: 'number',
  },
  {
    name: 'agent_percent',
    type: 'number',
  },
  {
    name: 'password',
    type: 'password',
  },
]

export const MODEL_FORMS = {
  users: USER_FORM,
}
