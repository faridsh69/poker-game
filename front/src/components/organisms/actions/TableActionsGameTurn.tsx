import { isUserGameTurn, isUserHasCashInGame } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { RaiseOrFoldOrCallActions } from 'src/components/organisms/actions/RaiseOrFoldOrCallActions'

export const TableActionsGameTurn = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  if (!isUserHasCashInGame(table, username)) return null
  if (!isUserGameTurn(table, username)) return null

  return <RaiseOrFoldOrCallActions table={table} />
}
