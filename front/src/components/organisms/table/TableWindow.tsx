import { TypeTable } from 'src/interfaces/type-game'
import { TableSeats } from 'src/components/organisms/table/TableSeats'
import { TableActions } from 'src/components/organisms/table/TableActions'
import { TableCards } from 'src/components/organisms/table/TableCards'
import { TableBackground } from './TableBackground'
import { TablePot } from './TablePot'
import { TableTotalPot } from './TableTotalPot'

export const TableWindow = (props: { table: TypeTable }) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table' key={table.id}>
      <TableBackground />
      <TableTotalPot table={table} />
      <TableCards table={table} />
      <TablePot table={table} />
      <TableSeats table={table} />
      <TableActions table={table} />
    </div>
  )
}
