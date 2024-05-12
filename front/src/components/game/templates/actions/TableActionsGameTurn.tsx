import { RaiseOrFoldOrCallActions } from 'src/components/game/templates/actions/RaiseOrFoldOrCallActions'
import { canSeeTableActionsGameTurn } from 'src/helpers/clientHelpersPoker'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsGameTurn = (props: TypeTableProps) => {
  const { table } = props

  if (!canSeeTableActionsGameTurn(table)) return null

  return <RaiseOrFoldOrCallActions table={table} />
}
