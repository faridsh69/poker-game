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

const API_URLS: { [key: string]: string } = {
  auth: 'auth',
  users: 'users',
  tables: 'tables',
  payments: 'payments',
  transactions: 'transactions',
  histories: 'histories',
}

const VITE_AUTH_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/${API_URLS.auth}`, false)
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
    endpoint: API_URLS.users,
  })

export const createUser: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: API_URLS.users,
    data,
  })

export const updateUser: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `${API_URLS.users}/${data.id}`,
    data,
  })

export const deleteUser: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `${API_URLS.users}/${id}`,
  })

///////////////////////////////////////////// TABLE //////////////////////////////////////////
export const getTables: TypeListApiMethod = () =>
  VITE_ADMIN_API_CLIENT.get({
    endpoint: API_URLS.tables,
  })

export const createTable: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: API_URLS.tables,
    data,
  })

export const updateTable: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `${API_URLS.tables}/${data.id}`,
    data,
  })

export const deleteTable: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `${API_URLS.tables}/${id}`,
  })

///////////////////////////////////////////// PAYMENT //////////////////////////////////////////
export const getPayments: TypeListApiMethod = () =>
  VITE_ADMIN_API_CLIENT.get({
    endpoint: API_URLS.payments,
  })

export const createPayment: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: API_URLS.payments,
    data,
  })

export const updatePayment: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `${API_URLS.payments}/${data.id}`,
    data,
  })

export const deletePayment: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `${API_URLS.payments}/${id}`,
  })

///////////////////////////////////////////// TRANSACTIONS //////////////////////////////////////////
export const getTransactions: TypeListApiMethod = () =>
  VITE_ADMIN_API_CLIENT.get({
    endpoint: API_URLS.transactions,
  })

export const createTransaction: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: API_URLS.transactions,
    data,
  })

export const updateTransaction: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `${API_URLS.transactions}/${data.id}`,
    data,
  })

export const deleteTransaction: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `${API_URLS.transactions}/${id}`,
  })

///////////////////////////////////////////// HISTORIES //////////////////////////////////////////
export const getHistories: TypeListApiMethod = () =>
  VITE_ADMIN_API_CLIENT.get({
    endpoint: API_URLS.histories,
  })

export const createHistory: TypeCreateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.post({
    endpoint: API_URLS.histories,
    data,
  })

export const updateHistory: TypeUpdateApiMethod = data =>
  VITE_ADMIN_API_CLIENT.patch({
    endpoint: `${API_URLS.histories}/${data.id}`,
    data,
  })

export const deleteHistory: TypeDeleteApiMethod = (id: number) =>
  VITE_ADMIN_API_CLIENT.remove({
    endpoint: `${API_URLS.histories}/${id}`,
  })
