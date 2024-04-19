import {
  getLocalstorage,
  refreshBrowser,
  removeLocalsotrage,
  setLocalsotrage,
} from 'src/helpers/common'
import { EXPIRED_ERROR, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from 'src/configs/constants'
import { TypeModel } from 'src/interfaces'

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

export const forceLogout = (errorMessage: string) => {
  if (errorMessage === EXPIRED_ERROR) {
    removeAccessToken()
    refreshBrowser()
  }
}
