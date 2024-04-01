import { FC } from 'react'
import * as yup from 'yup'
import { TypeModel, TypePropsInputController } from '.'

export type RoutesType = RouteType[]

export type RouteType = {
  name: string
  path: string
  element: React.ReactElement
  errorElement?: React.ReactElement
  children?: RouteType[]
}

export type TypeSidebarItem = {
  title: string
  url?: string
  icon: FC
}

export type TypeResolve = (value: unknown) => void

export type TypeOrder = 'asc' | 'desc'

export type TypeFormInput = {
  component?: (props: TypePropsInputController) => JSX.Element
  name: string
  label?: string
  type?: string
  options?: string[]
  multiple?: boolean
  autoComplete?: string
  autoFocus?: boolean
  disableOnUpdate?: boolean
}

export type TypeHeadCells = { id: string; label: string; disablePadding: boolean; numeric: boolean }

export type TypeBodyCells = { name: string }

export type TypeSchema = yup.ObjectSchema<TypeModel>

export type TypeModelFormKeys =
  | 'users'
  | 'register'
  | 'login'
  | 'profile'
  | 'tables'
  | 'payments'
  | 'transactions'
  | 'histories'
  | 'deposit'
  | 'withdraw'
  | 'transfer'
