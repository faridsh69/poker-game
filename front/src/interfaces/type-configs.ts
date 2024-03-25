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
