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
  updatePayment,
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
  tables: {
    listApi: getTables,
    showApi: getUser,
    createApi: createTable,
    updateApi: updateTable,
    deleteApi: deleteTable,
  },
  payments: {
    listApi: getPayments,
    showApi: getUser,
    createApi: createPayment,
    updateApi: updatePayment,
    deleteApi: deletePayment,
  },
  transactions: {
    listApi: getTransactions,
    showApi: getUser,
    createApi: createTransaction,
    updateApi: updateTransaction,
    deleteApi: deleteTransaction,
  },
  histories: {
    listApi: getHistories,
    showApi: getUser,
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
      onError: errorHandler,
    },
  },
})
