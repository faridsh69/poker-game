import { FC } from 'react'

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

export type OrderType = 'asc' | 'desc'

export type TypeFormInput = {
  name: string
  type?: string
  component?: FC
}

export type TypeHeadCells = { id: string; label: string; disablePadding: boolean; numeric: boolean }

export type TypeBodyCells = { name: string }
