import axios, { AxiosInstance } from 'axios'

import { getToken } from 'src/helpers/auth'
import {
  CreateApiClientType,
  TypeAxiosMethod,
  TypeErrorHandlerInterceptor,
  TypeRequestInterceptor,
  TypeResponseInterceptor,
} from 'src/interfaces'
import { isString } from './common'

export const createApiClient: CreateApiClientType = (baseURL, auth = false) => {
  const axiosInstance: AxiosInstance = axios.create({ baseURL })
  axiosInstance.interceptors.request.use(RequestInterceptor)
  if (auth) {
    axiosInstance.interceptors.request.use(authInterceptor)
  }
  axiosInstance.interceptors.response.use(responseInterceptor, errorHandlerInterceptor)

  const get: TypeAxiosMethod = ({ endpoint, data, options }) =>
    axiosInstance.get(endpoint, {
      params: data,
      ...options,
    })

  const post: TypeAxiosMethod = ({ endpoint, data, options }) =>
    axiosInstance.post(endpoint, data, options)

  const put: TypeAxiosMethod = ({ endpoint, data, options }) =>
    axiosInstance.put(endpoint, data, options)

  const patch: TypeAxiosMethod = ({ endpoint, data, options }) =>
    axiosInstance.patch(endpoint, data, options)

  const remove: TypeAxiosMethod = ({ endpoint, data, options }) =>
    axiosInstance.delete(endpoint, {
      params: data,
      ...options,
    })

  return { get, post, put, patch, remove }
}

const RequestInterceptor: TypeRequestInterceptor = config => {
  config.headers['Content-Type'] = 'application/json'

  return config
}

const authInterceptor: TypeRequestInterceptor = config => {
  const accessToken = getToken()
  config.headers!.Authorization = `Bearer ${accessToken}`

  return config
}

const responseInterceptor: TypeResponseInterceptor = response => response?.data || response

const errorHandlerInterceptor: TypeErrorHandlerInterceptor = error => {
  const message = error.response?.data?.message
  if (message) {
    if (isString(message as never)) {
      return Promise.reject({ message })
    }

    const messagesString = message.map(m => m.message).join(' ')

    return Promise.reject({ message: messagesString })
  }

  return Promise.reject(error)
}
