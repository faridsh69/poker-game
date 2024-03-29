import { getLocalstorage, removeLocalsotrage, setLocalsotrage } from 'src/helpers/common'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from 'src/configs/constants'
import { TypeModel } from 'src/interfaces'

export const getAccessToken = (): string => {
  const user = getLocalstorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  // @ts-ignore
  return user?.access_token
}

export const getAuthUsername = () => {
  const user = getLocalstorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  // @ts-ignore
  return user?.username
}

export const setAccessToken = (user: TypeModel) =>
  setLocalsotrage(LOCAL_STORAGE_ACCESS_TOKEN_KEY, user)

export const removeAccessToken = () => removeLocalsotrage(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
