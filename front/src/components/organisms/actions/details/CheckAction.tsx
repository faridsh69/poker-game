import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const CheckAction = (props: TypeTableProps) => {
  const { table } = props

  const { handleCheckAction } = useSocketActions(table.id)

  return <ActionButton label='Check' onClick={handleCheckAction} />
}
