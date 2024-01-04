import { Money } from 'src/components/molecules/Money'

import { TypeTableProps } from 'src/interfaces'

export const TableTotalPot = (props: TypeTableProps) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table-total'>
      <span>Total Pot :</span>
      <Money money={table.total} />
    </div>
  )
}
