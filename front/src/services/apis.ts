import { createApiClient } from 'src/helpers/service'
import {
  TypeCreateApiMethod,
  TypeDeleteApiMethod,
  TypeListApiMethod,
  TypeUpdateApiMethod,
} from 'src/interfaces'

const { VITE_API_BASE_URL, VITE_SOCKET_URL } = import.meta.env

export const SOCKET_URL = VITE_SOCKET_URL

if (!VITE_API_BASE_URL) {
  throw new Error('Please copy .env.example to .env.local')
}

const VITE_AUTH_API_CLIENT = createApiClient(VITE_API_BASE_URL, false)
const VITE_USERS_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/users`, true)
const VITE_TABLES_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/tables`, true)
const VITE_PAYMENTS_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/payments`, true)

///////////////////////////////////////////// AUTH //////////////////////////////////////////
export const postLogin: TypeCreateApiMethod = data =>
  VITE_AUTH_API_CLIENT.post({
    endpoint: 'login',
    data,
  })

export const postRegister: TypeCreateApiMethod = data =>
  VITE_AUTH_API_CLIENT.post({
    endpoint: 'register',
    data,
  })

///////////////////////////////////////////// USER //////////////////////////////////////////
export const getUsers: TypeListApiMethod = () =>
  VITE_USERS_API_CLIENT.get({
    endpoint: '',
  })

export const createUser: TypeCreateApiMethod = data =>
  VITE_USERS_API_CLIENT.post({
    endpoint: '',
    data,
  })

export const updateUser: TypeUpdateApiMethod = data =>
  VITE_USERS_API_CLIENT.patch({
    endpoint: `${data.id}`,
    data,
  })

export const deleteUser: TypeDeleteApiMethod = (id: number) =>
  VITE_USERS_API_CLIENT.remove({
    endpoint: `${id}`,
  })

///////////////////////////////////////////// TABLE //////////////////////////////////////////
export const getTables: TypeListApiMethod = () =>
  VITE_TABLES_API_CLIENT.get({
    endpoint: '',
  })

export const createTable: TypeCreateApiMethod = data =>
  VITE_TABLES_API_CLIENT.post({
    endpoint: '',
    data,
  })

export const updateTable: TypeUpdateApiMethod = data =>
  VITE_TABLES_API_CLIENT.patch({
    endpoint: `${data.id}`,
    data,
  })

export const deleteTable: TypeDeleteApiMethod = (id: number) =>
  VITE_TABLES_API_CLIENT.remove({
    endpoint: `${id}`,
  })
///////////////////////////////////////////// PAYMENT //////////////////////////////////////////
export const getPayments: TypeListApiMethod = () =>
  VITE_PAYMENTS_API_CLIENT.get({
    endpoint: '',
  })

export const createPayment: TypeCreateApiMethod = data =>
  VITE_PAYMENTS_API_CLIENT.post({
    endpoint: '',
    data,
  })

export const updatePayment: TypeUpdateApiMethod = data =>
  VITE_PAYMENTS_API_CLIENT.patch({
    endpoint: `${data.id}`,
    data,
  })

export const deletePayment: TypeDeleteApiMethod = (id: number) =>
  VITE_PAYMENTS_API_CLIENT.remove({
    endpoint: `${id}`,
  })
