import { QueryClient } from '@tanstack/react-query'

import { errorHandler } from 'src/helpers/errorHandler'
import { TypeApiKeyMap } from 'src/interfaces'
import {
  createHistory,
  createPayment,
  createTable,
  createTransaction,
  createUser,
  deleteHistory,
  deletePayment,
  deleteTable,
  deleteTransaction,
  deleteUser,
  getHistories,
  getPayments,
  getTables,
  getTransactions,
  getUser,
  getUsers,
  updateHistory,
  updatePassword,
  updatePayment,
  updateProfile,
  updateTable,
  updateTransaction,
  updateUser,
} from 'src/services/apis'

export const API_KEY_MAP: TypeApiKeyMap = {
  users: {
    listApi: getUsers,
    showApi: getUser,
    createApi: createUser,
    updateApi: updateUser,
    deleteApi: deleteUser,
  },
  profile: {
    showApi: getUser,
    updateApi: updateProfile,
  },
  password: {
    showApi: getUser,
    updateApi: updatePassword,
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
  transactions: {
    listApi: getTransactions,
    createApi: createTransaction,
    updateApi: updateTransaction,
    deleteApi: deleteTransaction,
  },
  histories: {
    listApi: getHistories,
    createApi: createHistory,
    updateApi: updateHistory,
    deleteApi: deleteHistory,
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
      onError: error => errorHandler(error, 'mutations'),
    },
  },
})
