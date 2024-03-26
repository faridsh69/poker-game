import { ObjectSchema } from 'yup'

import { TypeCard, TypeFormInput, TypeModel, TypeSeat, TypeTable } from '.'

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

export type TypeSuspenderComponent = (props: {
  pageName: string
  auth?: boolean
  guest?: boolean
}) => JSX.Element

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
  inputs: TypeFormInput[]
  values: TypeModel | undefined
  schema: ObjectSchema<TypeModel>
  onSubmit: (data: TypeModel) => void
  submitText: string
}
