import { Money } from 'src/components/molecules/Money'
import { roundNumber } from 'src/helpers/clientHelpersPoker'

import { TypeTableProps } from 'src/interfaces'

export const TableTotalPot = (props: TypeTableProps) => {
  const { table } = props

  const total = table.seats.filter(s => s.user).reduce((sum, s) => sum + s.user.cash.inPot, 0)
  const roundTotal = roundNumber(total)

  return (
    <div className='dnd-window-body-table-total'>
      <span>Total Pot :</span>
      <Money money={roundTotal + table.pot} />
    </div>
  )
}
