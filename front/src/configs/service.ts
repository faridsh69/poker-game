import { QueryClient } from '@tanstack/react-query'

import {
  createPayment,
  createTable,
  createUser,
  deletePayment,
  deleteTable,
  deleteUser,
  getPayments,
  getTables,
  getUsers,
  updatePayment,
  updateTable,
  updateUser,
} from 'src/services/apis'
import { errorHandler } from 'src/helpers/errorHandler'
import { TypeApiKeyMap } from 'src/interfaces'

export const API_KEY_MAP: TypeApiKeyMap = {
  users: {
    listApi: getUsers,
    createApi: createUser,
    updateApi: updateUser,
    deleteApi: deleteUser,
  },
  tables: {
    listApi: getTables,
    createApi: createTable,
    updateApi: updateTable,
    deleteApi: deleteTable,
  },
  payments: {
    listApi: getPayments,
    createApi: createPayment,
    updateApi: updatePayment,
    deleteApi: deletePayment,
  },
}

export const REACT_QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
    mutations: {
      onError: errorHandler,
    },
  },
})
