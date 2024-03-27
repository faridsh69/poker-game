import { ActionButton } from 'src/components/game/templates/actions/details/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const CheckAction = (props: TypeTableProps) => {
  const { table } = props

  const { handleCheckAction } = useSocketActions(table.id)

  return <ActionButton label='Check' onClick={handleCheckAction} />
}
