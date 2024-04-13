import {
  getLocalstorage,
  refreshBrowser,
  removeLocalsotrage,
  setLocalsotrage,
} from 'src/helpers/common'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, UNAUTHORIZED_HTTP_CODE } from 'src/configs/constants'
import { TypeModel } from 'src/interfaces'
import { AxiosError } from 'axios'

const getAuthUser = () => {
  return getLocalstorage<TypeModel>(LOCAL_STORAGE_ACCESS_TOKEN_KEY, {})
}

export const isLoggedin = (): boolean => !!getAuthUser().access_token

export const getAccessToken = (): string => {
  return getAuthUser().access_token as string
}

export const getAuthUsername = (): string => {
  return getAuthUser().username as string
}

export const getAuthId = (): number => {
  return getAuthUser()?.id as number
}

export const setAccessToken = (user: TypeModel) =>
  setLocalsotrage(LOCAL_STORAGE_ACCESS_TOKEN_KEY, user)

export const removeAccessToken = () => removeLocalsotrage(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

export const forceLogout = (error: AxiosError) => {
  if (error.response?.status === UNAUTHORIZED_HTTP_CODE) {
    removeAccessToken()
    refreshBrowser()
  }
}
