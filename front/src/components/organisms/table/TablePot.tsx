import { Money } from 'src/components/molecules/Money'
import { TypeTableProps } from 'src/interfaces'

export const TablePot = (props: TypeTableProps) => {
  const { table } = props

  if (!table.pot) return null
  return (
    <div className='dnd-window-body-table-pot'>
      <Money money={table.pot} showChips />
    </div>
  )
}
