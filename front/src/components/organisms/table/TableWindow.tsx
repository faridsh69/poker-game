import tableImage from 'src/images/table.png'
import { TableSeats } from 'src/components/organisms/table/TableSeats'
import { TableActions } from 'src/components/organisms/table/TableActions'
import { TableCards } from 'src/components/organisms/table/TableCards'
import { TypeTable } from 'src/interfaces/type-game'

export const TableWindow = (props: { table: TypeTable }) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table' key={table.id}>
      <img src={tableImage} className='dnd-window-body-table-backgroundimg' alt='poker-table' />
      <TableSeats table={table} />
      <TableActions table={table} />

      {/* <TableSidebar table={table} /> */}
      <TableCards table={table} />
      {!!table.pot && <div className='home-runtable-main-body-tablepot'>${table.pot}</div>}
    </div>
  )
}
