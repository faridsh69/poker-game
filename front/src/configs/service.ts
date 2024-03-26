import { QueryClient } from '@tanstack/react-query'

import { deleteUser, getUsers, postRegister, updateUser } from 'src/services/apis'
import { errorHandler } from 'src/helpers/errorHandler'
import { TypeApiKeyMap } from 'src/interfaces'

export const API_KEY_MAP: TypeApiKeyMap = {
  users: {
    listApi: getUsers,
    createApi: postRegister,
    updateApi: updateUser,
    deleteApi: deleteUser,
  },
}

export const REACT_QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      throwOnError: errorHandler,
    },
    mutations: {
      onError: errorHandler,
    },
  },
})
