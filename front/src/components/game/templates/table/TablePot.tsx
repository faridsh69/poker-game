import { TablePotCollectingAnimation } from 'src/components/game/templates/animations/TablePotCollectingAnimation'
import { TypePot, TypeTableProps } from 'src/interfaces'
import { Money } from 'src/components/game/molecules/Money'
import { TablePotWinnerAnimation } from 'src/components/game/templates/animations/TablePotWinnerAnimation'
import { isWinnerSeat } from 'src/helpers/clientHelpersPoker'

export const TablePot = (props: TypeTableProps & { tablePot: TypePot }) => {
  const { table, tablePot } = props

  const winnerSeats = table.seats.filter(s => isWinnerSeat(s))

  if (!tablePot.amount) return null

  return (
    <div className='dnd-window-body-table-pots-pot'>
      <TablePotCollectingAnimation table={table} />
      <TablePotWinnerAnimation table={table} amount={tablePot.amount} />
      {!winnerSeats.length && <Money money={tablePot.amount} showChips />}
    </div>
  )
}
