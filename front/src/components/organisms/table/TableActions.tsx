import { TableActionsJoinGame } from '../actions/TableActionsJoinGame'
import { TypeTableProps } from 'src/interfaces'
import { TableActionsGameTurn } from 'src/components/organisms/actions/TableActionsGameTurn'
import { TableActionsGeneral } from '../actions/TableActionsGeneral'

export const TableActions = (props: TypeTableProps) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table-actions'>
      <TableActionsJoinGame table={table} />
      <TableActionsGameTurn table={table} />
      <TableActionsGeneral table={table} />
    </div>
  )
}
