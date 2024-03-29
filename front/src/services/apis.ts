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

const VITE_AUTH_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/auth`, false)
const VITE_ADMIN_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/`, true)

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
  VITE_ADMIN_API_CLIENT.get({
    endpoint: 'users',
  })

export const createUser: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: 'users',
    data,
  })

export const updateUser: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `users/${data.id}`,
    data,
  })

export const deleteUser: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `users/${id}`,
  })

///////////////////////////////////////////// TABLE //////////////////////////////////////////
export const getTables: TypeListApiMethod = () =>
  VITE_ADMIN_API_CLIENT.get({
    endpoint: 'tables',
  })

export const createTable: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: 'tables',
    data,
  })

export const updateTable: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `tables/${data.id}`,
    data,
  })

export const deleteTable: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `tables/${id}`,
  })
///////////////////////////////////////////// PAYMENT //////////////////////////////////////////
export const getPayments: TypeListApiMethod = () =>
  VITE_ADMIN_API_CLIENT.get({
    endpoint: 'payments',
  })

export const createPayment: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: 'payments',
    data,
  })

export const updatePayment: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `payments/${data.id}`,
    data,
  })

export const deletePayment: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `payments/${id}`,
  })
