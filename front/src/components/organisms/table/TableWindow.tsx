import { TableSeats } from 'src/components/organisms/table/TableSeats'
import { TableActions } from 'src/components/organisms/table/TableActions'
import { TableCards } from 'src/components/organisms/table/TableCards'
import { TableBackground } from 'src/components/organisms/table/TableBackground'
import { TablePot } from 'src/components/organisms/table/TablePot'
import { TableTotalPot } from 'src/components/organisms/table/TableTotalPot'
import { TypeTableProps } from 'src/interfaces'

export const TableWindow = (props: TypeTableProps) => {
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
