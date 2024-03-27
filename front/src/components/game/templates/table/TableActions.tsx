import { TypeTableProps } from 'src/interfaces'
import { TableActionsPreTurn } from 'src/components/game/templates/actions/TableActionsPreTurn'
import { TableActionsGameTurn } from 'src/components/game/templates/actions/TableActionsGameTurn'
import { TableActionsJoinGame } from 'src/components/game/templates/actions/TableActionsJoinGame'
import { TableActionsJoinPlay } from 'src/components/game/templates/actions/TableActionsJoinPlay'
import { TableActionsLeaveGame } from 'src/components/game/templates/actions/TableActionsLeaveGame'
import { TableActionsShowCards } from 'src/components/game/templates/actions/TableActionsShowCards'
import { TableActionsAchievements } from 'src/components/game/templates/actions/TableActionsAchievements'

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
      <TableActionsAchievements table={table} />
    </div>
  )
}
