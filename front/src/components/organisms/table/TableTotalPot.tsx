import { Money } from 'src/components/molecules/Money'

import { TypeTableProps } from 'src/interfaces'

export const TableTotalPot = (props: TypeTableProps) => {
  const { table } = props

  const total = table.seats.filter(s => s.user).reduce((sum, s) => sum + s.user.cash.inPot, 0)

  return (
    <div className='dnd-window-body-table-total'>
      <span>Total Pot :</span>
      <Money money={total + table.pot} />
    </div>
  )
}
