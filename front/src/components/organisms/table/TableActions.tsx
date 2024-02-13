import { TypeTableProps } from 'src/interfaces'
import { TableActionsJoinGame } from 'src/components/organisms/actions/TableActionsJoinGame'
import { TableActionsLeaveGame } from 'src/components/organisms/actions/TableActionsLeaveGame'
import { TableActionsGameTurn } from 'src/components/organisms/actions/TableActionsGameTurn'
import { TableActionsPreTurn } from '../actions/TableActionsPreTurn'
import { TableActionsJoinPlay } from '../actions/TableActionsJoinPlay'
import { TableActionsShowCards } from '../actions/TableActionsShowCards'

export const TableActions = (props: TypeTableProps) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table-actions'>
      {/* Only if user is seatout */}
      <TableActionsJoinGame table={table} />
      {/* Only if user has no card */}
      <TableActionsJoinPlay table={table} />
      {/* Only if user has cards */}
      <TableActionsLeaveGame table={table} />
      {/* Only if user has cash and turn */}
      <TableActionsGameTurn table={table} />
      {/* Only if user has cash and not turn not fold */}
      <TableActionsPreTurn table={table} />
      {/* Only if user fold and show phase */}
      <TableActionsShowCards table={table} />
    </div>
  )
}
