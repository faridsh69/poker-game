import { getLocalstorage, removeLocalsotrage, setLocalsotrage } from 'src/helpers/common'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from 'src/configs/constants'
import { TypeModel } from 'src/interfaces'

export const getAccessToken = (): string => {
  const user = getLocalstorage<TypeModel>(LOCAL_STORAGE_ACCESS_TOKEN_KEY, {})
  return user?.access_token as string
}

export const getAuthUsername = (): string => {
  const user = getLocalstorage<TypeModel>(LOCAL_STORAGE_ACCESS_TOKEN_KEY, {})

  return user?.username as string
}

export const setAccessToken = (user: TypeModel) =>
  setLocalsotrage(LOCAL_STORAGE_ACCESS_TOKEN_KEY, user)

export const removeAccessToken = () => removeLocalsotrage(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
