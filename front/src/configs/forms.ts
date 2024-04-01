import { CheckBoxController } from 'src/components/cms/templates/controllers/CheckboxController'
import { SelectController } from 'src/components/cms/templates/controllers/SelectController'
import { TypeFormInput, TypeModelFormKeys } from 'src/interfaces'
import { SEAT_ROLES, TABLE_PASOORS, TABLE_PHASES } from './clientConstantsPoker'
import { EditorController } from 'src/components/cms/templates/controllers/EditorController'

export const USERS_STATUS_ENUM = ['needConfirm', 'suspended', 'blocked', 'active']

export const PAYMENTS_GATEWAYS = ['btc', 'usdt', 'perfectMoney']

export const PAYMENTS_STATUSES = ['pending', 'reject', 'success']

export const TRANSACTIONS_REASONS = [
  'buyin',
  'leaveSeat',
  'transfer',
  'reward',
  'rakeBack',
  'bonusCode',
]

export const USERS_ROLE_ENUM = ['player', 'agent', 'admin']

export const USERS_GENDER_ENUM = ['male', 'female', 'unspecified']

export const REGISTER_FORM: TypeFormInput[] = [
  {
    name: 'email',
    label: 'Email Address',
    autoComplete: 'email',
    autoFocus: true,
  },
  {
    name: 'username',
  },
  {
    name: 'password',
    autoComplete: 'current-password',
  },
]

export const LOGIN_FORM: TypeFormInput[] = [
  {
    name: 'email',
    label: 'Email Address',
    autoComplete: 'email',
    autoFocus: true,
  },
  {
    name: 'password',
    autoComplete: 'current-password',
  },
  {
    name: 'remember',
    label: 'Remember me',
    component: CheckBoxController,
  },
]

export const PROFILE_FORM: TypeFormInput[] = [
  {
    name: 'first_name',
  },
  {
    name: 'last_name',
  },
  {
    name: 'phone',
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
]

export const USERS_FORM: TypeFormInput[] = [
  {
    name: 'username',
    disableOnUpdate: true,
  },
  {
    name: 'email',
    type: 'email',
    disableOnUpdate: true,
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

export const TABLES_FORM: TypeFormInput[] = [
  {
    name: 'title',
  },
  {
    name: 'pasoor',
    component: SelectController,
    options: Object.values(TABLE_PASOORS),
  },
  {
    name: 'blinds_small',
    type: 'number',
  },
  {
    name: 'blinds_big',
    type: 'number',
  },
  {
    name: 'buyin_min',
    type: 'number',
  },
  {
    name: 'buyin_max',
    type: 'number',
  },
  {
    name: 'seats',
    type: 'number',
  },
]

export const PAYMENTS_FORM: TypeFormInput[] = [
  {
    name: 'user_id',
    type: 'number',
  },
  {
    name: 'price',
    type: 'number',
  },
  {
    name: 'user_giving',
    type: 'boolean',
    component: CheckBoxController,
  },
  {
    name: 'description',
  },
  {
    name: 'gateway',
    component: SelectController,
    options: PAYMENTS_GATEWAYS,
  },
  {
    name: 'status',
    component: SelectController,
    options: PAYMENTS_STATUSES,
  },
  {
    name: 'wallet',
  },
]

export const DEPOSIT_FORM: TypeFormInput[] = [
  {
    name: 'price',
    type: 'number',
    autoFocus: true,
  },
  {
    name: 'description',
  },
  {
    name: 'gateway',
    component: SelectController,
    options: PAYMENTS_GATEWAYS,
  },
  {
    name: 'wallet',
  },
]

export const WITHDRAW_FORM: TypeFormInput[] = [
  {
    name: 'price',
    type: 'number',
    autoFocus: true,
  },
  {
    name: 'description',
  },
  {
    name: 'gateway',
    component: SelectController,
    options: PAYMENTS_GATEWAYS,
  },
  {
    name: 'wallet',
  },
]

export const TRANSACTIONS_FORM: TypeFormInput[] = [
  {
    name: 'user_id',
    type: 'number',
  },
  {
    name: 'price',
    type: 'number',
  },
  {
    name: 'user_giving',
    type: 'boolean',
    component: CheckBoxController,
  },
  {
    name: 'description',
  },
  {
    name: 'reason',
    component: SelectController,
    options: TRANSACTIONS_REASONS,
  },
  {
    name: 'table_id',
    type: 'number',
  },
  {
    name: 'bonus_code_id',
    type: 'number',
  },
]

export const TRANSFER_FORM: TypeFormInput[] = [
  {
    name: 'username',
  },
  {
    name: 'price',
    type: 'number',
  },
  {
    name: 'description',
  },
]

export const HISTORIES_FORM = [
  {
    name: 'table_id',
    type: 'number',
  },
  {
    name: 'total',
    type: 'number',
  },
  {
    name: 'roleTurn',
    component: SelectController,
    options: Object.values(SEAT_ROLES),
  },
  {
    name: 'phase',
    component: SelectController,
    options: Object.values(TABLE_PHASES),
  },
  {
    name: 'seats',
    component: EditorController,
  },
  {
    name: 'cards',
    component: EditorController,
  },
  {
    name: 'pots',
    component: EditorController,
  },
]

export const MODEL_FORMS_NAMES: { [key in TypeModelFormKeys]: TypeModelFormKeys } = {
  register: 'register',
  login: 'login',
  profile: 'profile',
  users: 'users',
  tables: 'tables',
  payments: 'payments',
  transactions: 'transactions',
  histories: 'histories',
  deposit: 'deposit',
  withdraw: 'withdraw',
  transfer: 'transfer',
}

export const MODEL_FORMS: { [key in TypeModelFormKeys]: TypeFormInput[] } = {
  register: REGISTER_FORM,
  login: LOGIN_FORM,
  profile: PROFILE_FORM,
  users: USERS_FORM,
  tables: TABLES_FORM,
  payments: PAYMENTS_FORM,
  transactions: TRANSACTIONS_FORM,
  histories: HISTORIES_FORM,
  deposit: DEPOSIT_FORM,
  withdraw: WITHDRAW_FORM,
  transfer: TRANSFER_FORM,
}
