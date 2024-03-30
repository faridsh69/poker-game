import {
  getLocalstorage,
  refreshBrowser,
  removeLocalsotrage,
  setLocalsotrage,
} from 'src/helpers/common'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, UNAUTHORIZED_HTTP_CODE } from 'src/configs/constants'
import { TypeModel } from 'src/interfaces'
import { AxiosError } from 'axios'

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

export const forceLogout = (error: AxiosError) => {
  if (error.response?.status === UNAUTHORIZED_HTTP_CODE) {
    // removeAccessToken()
    // refreshBrowser()
  }
}
