import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export type TypeErrorHandlerInterceptor = (error: AxiosError) => Promise<AxiosError>

export type TypeResponseInterceptor = (response: AxiosResponse) => AxiosResponse

export type TypeRequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig

export type TypeAxiosMethod = (parameters: {
  endpoint: string
  data?: object
  options?: object
}) => Promise<AxiosResponse>

export type CreateApiClientType = (
  baseURL: string,
  auth: boolean,
) => {
  get: TypeAxiosMethod
  post: TypeAxiosMethod
  put: TypeAxiosMethod
  remove: TypeAxiosMethod
}

export type TypeListApiMethod = () => Promise<AxiosResponse>

export type TypeCreateApiMethod = (data: object) => Promise<AxiosResponse>

export type TypeUpdateApiMethod = (data: { id: number }) => Promise<AxiosResponse>

export type TypeDeleteApiMethod = (id: number) => Promise<AxiosResponse>

export type TypeApiKeyMap = {
  [key: string]: {
    listApi: TypeListApiMethod
    createApi: TypeCreateApiMethod
    updateApi: TypeUpdateApiMethod
    deleteApi: TypeDeleteApiMethod
  }
}
