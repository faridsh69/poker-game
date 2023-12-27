import { TypeTableProps } from 'src/interfaces'

export const TablePot = (props: TypeTableProps) => {
  const { table } = props

  return table.pot && <div className='dnd-window-body-table-pot'>${table.pot}</div>
}
