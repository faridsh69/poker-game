import { TypeSeat, TypeTable } from '.'

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
