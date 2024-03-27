import { canSeeTableActionsGameTurn } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { RaiseOrFoldOrCallActions } from 'src/components/game/templates/actions/RaiseOrFoldOrCallActions'

export const TableActionsGameTurn = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  if (!canSeeTableActionsGameTurn(table, username)) return null

  return <RaiseOrFoldOrCallActions table={table} />
}
