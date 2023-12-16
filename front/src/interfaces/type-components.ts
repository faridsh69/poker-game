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
