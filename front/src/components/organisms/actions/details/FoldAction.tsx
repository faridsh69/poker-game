import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const FoldAction = (props: TypeTableProps) => {
  const { table } = props

  const { handleFoldAction } = useSocketActions(table.id)

  return <ActionButton label='Fold' onClick={handleFoldAction} />
}
