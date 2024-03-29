import { canSeeTableActionsGameTurn } from 'src/helpers/clientHelpersPoker'
import { TypeTableProps } from 'src/interfaces'
import { RaiseOrFoldOrCallActions } from 'src/components/game/templates/actions/RaiseOrFoldOrCallActions'
import { getAuthUsername } from 'src/helpers/auth'

export const TableActionsGameTurn = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()

  if (!canSeeTableActionsGameTurn(table, username)) return null

  return <RaiseOrFoldOrCallActions table={table} />
}
