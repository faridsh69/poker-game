import { TypeTableProps } from 'src/interfaces'
import { TableActionsJoinGame } from 'src/components/organisms/actions/TableActionsJoinGame'
import { TableActionsLeaveGame } from 'src/components/organisms/actions/TableActionsLeaveGame'
import { TableActionsGameTurn } from 'src/components/organisms/actions/TableActionsGameTurn'

export const TableActions = (props: TypeTableProps) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table-actions'>
      <TableActionsJoinGame table={table} />
      <TableActionsLeaveGame table={table} />
      <TableActionsGameTurn table={table} />
    </div>
  )
}
