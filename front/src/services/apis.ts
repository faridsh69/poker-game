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
const VITE_USER_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/users`, true)

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
  VITE_USER_API_CLIENT.get({
    endpoint: '',
  })

export const createUser: TypeCreateApiMethod = data =>
  VITE_USER_API_CLIENT.post({
    endpoint: '',
    data,
  })

export const updateUser: TypeUpdateApiMethod = data =>
  VITE_USER_API_CLIENT.patch({
    endpoint: `${data.id}`,
    data,
  })

export const deleteUser: TypeDeleteApiMethod = (id: number) =>
  VITE_USER_API_CLIENT.remove({
    endpoint: `${id}`,
  })
