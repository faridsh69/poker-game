import { TableSeats } from 'src/components/game/templates/table/TableSeats'
import { TableActions } from 'src/components/game/templates/table/TableActions'
import { TableCards } from 'src/components/game/templates/table/TableCards'
import { TableBackground } from 'src/components/game/templates/table/TableBackground'
import { TableTotalPot } from 'src/components/game/templates/table/TableTotalPot'
import { TypeTableProps } from 'src/interfaces'
import { TablePots } from 'src/components/game/templates/table/TablePots'

export const TableWindow = (props: TypeTableProps) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table' key={table.id}>
      <TableBackground />
      <TableTotalPot table={table} />
      <TableCards table={table} />
      <TablePots table={table} />
      <TableSeats table={table} />
      <TableActions table={table} />
    </div>
  )
}
