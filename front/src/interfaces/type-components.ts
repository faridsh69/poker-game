import { ChangeEvent, MouseEvent } from 'react'
import { Control } from 'react-hook-form'

import { TypeBodyCells, TypeCard, TypeHeadCells, TypeModel, TypeModelFormKeys, TypeOrder, TypeSeat, TypeTable } from '.'

export type TypeDraggableWindowProps = {
  top: number
  left: number
  id: string
  topbar: JSX.Element
  body: JSX.Element
}

export type TypeDndWindowProps = {
  topbar: JSX.Element
  body: JSX.Element
}

export type TypeSuspenderComponent = (props: { pageName: string; canAuth?: boolean; canGuest?: boolean }) => JSX.Element

export type TypeConfirmModalComponent = {
  show: boolean
  message?: string
  onConfirm?: () => void
}

export type TypeBuyinModalComponent = {
  show: boolean
  table?: TypeTable
  onBuyin?: (amount: number) => void
}

export type TypeSeatProps = {
  seat: TypeSeat
}

export type TypeTableProps = {
  table: TypeTable
}

export type TypeSeatAnTableProps = {
  seat: TypeSeat
  table: TypeTable
}

export type TypeSeatAndShowPhaseProps = {
  seat: TypeSeat
  isShowPhase: boolean
}

export type TypeGameCardProps = {
  card: TypeCard
  cardIndex?: number
  className?: string
  backcard: boolean
  isRabbitcard: boolean
}

export type TypePropsFormMui = {
  formName: TypeModelFormKeys
  values: TypeModel | undefined
  onSubmit: (data: TypeModel) => void
  isUpdating: boolean
  submitText: string
}

export type TypePropsInputController = {
  control: Control<TypeModel>
  name: string
  disabled: boolean
  label?: string
  type?: string
  options?: string[]
  multiple?: boolean
  autoComplete?: string
  autoFocus?: boolean
}

export type TypePropsTableHeader = {
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: TypeOrder
  orderBy: string
  numSelected: number
  rowCount: number
  onRequestSort: (event: MouseEvent, property: string) => void
  headCells: TypeHeadCells[]
}

export type TypePropsTableMui = {
  list: TypeModel[]
  bodyCells: TypeBodyCells[]
  headCells: TypeHeadCells[]
  handleEdit?: (id: number) => void
  handleDelete?: (id: number) => void
}
