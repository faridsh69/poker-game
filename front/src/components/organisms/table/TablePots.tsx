import { TypeTableProps } from 'src/interfaces'
import { TablePot } from 'src/components/organisms/table/TablePot'

export const TablePots = (props: TypeTableProps) => {
  const { table } = props

  if (!table.pots.length) return null

  return (
    <div className='dnd-window-body-table-pots'>
      {table.pots.map((pot, potIndex) => {
        return <TablePot table={table} pot={pot} key={potIndex} />
      })}
    </div>
  )
}
