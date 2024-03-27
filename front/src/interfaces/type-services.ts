import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

type TypeErrorValidation = { message: string; property: string }

export type TypeErrorHandlerInterceptor = (
  error: AxiosError<{ message: TypeErrorValidation[] }>,
) => Promise<AxiosError>

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
  patch: TypeAxiosMethod
  remove: TypeAxiosMethod
}

export type TypeModel = { [key: string]: string | number | undefined }

export type TypeListApiMethod = () => Promise<AxiosResponse<TypeModel[]>>
export type TypeCreateApiMethod = (data: TypeModel) => Promise<AxiosResponse<TypeModel>>
export type TypeUpdateApiMethod = (data: TypeModel) => Promise<AxiosResponse<TypeModel>>
export type TypeDeleteApiMethod = (id: number) => Promise<AxiosResponse<void>>

export type TypeApis = {
  listApi: TypeListApiMethod
  createApi: TypeCreateApiMethod
  updateApi: TypeUpdateApiMethod
  deleteApi: TypeDeleteApiMethod
}
export type TypeApiKeyMap = {
  [key: string]: TypeApis
}

export type TypeUseCrud = (key: string) => {
  list: TypeModel[]

  createMutation: {
    mutate: (data: TypeModel) => void
  }

  updateMutation: {
    mutate: (data: TypeModel) => void
  }

  deleteMutation: {
    mutate: (id: number) => void
  }
}
