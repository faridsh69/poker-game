import { TypeTable } from 'src/interfaces'

export const TablePot = (props: { table: TypeTable }) => {
  const { table } = props

  return table.pot && <div className='dnd-window-body-table-pot'>${table.pot}</div>
}
