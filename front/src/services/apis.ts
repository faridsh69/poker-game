import { createApiClient } from 'src/helpers/service'
import { TypeApiMethod } from 'src/interfaces'

const { VITE_API_BASE_URL, VITE_SOCKET_URL } = import.meta.env

export const SOCKET_URL = VITE_SOCKET_URL

if (!VITE_API_BASE_URL) {
  throw new Error('Please copy .env.example to .env.local')
}

const VITE_AUTH_API_CLIENT = createApiClient(VITE_API_BASE_URL)
const VITE_USER_API_CLIENT = createApiClient(`${VITE_API_BASE_URL}/user`, true)

export const getUsers: TypeApiMethod = data =>
  VITE_USER_API_CLIENT.get({
    endpoint: '',
    data,
  })

export const postRegister: TypeApiMethod = data =>
  VITE_USER_API_CLIENT.post({
    endpoint: '',
    data,
  })

export const updateUser: TypeApiMethod = data =>
  VITE_USER_API_CLIENT.put({
    // @ts-ignore
    endpoint: `id/${data.id}`,
    data,
  })

// @ts-ignore
export const deleteUser: TypeApiMethod = (id: number) => {
  console.log('XX ID', id)
  VITE_USER_API_CLIENT.remove({
    endpoint: `${id}`,
  })
}

export const postLogin: TypeApiMethod = data =>
  VITE_AUTH_API_CLIENT.post({
    endpoint: 'oauth/token',
    data,
  })
