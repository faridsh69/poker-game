import { Money } from 'src/components/game/molecules/Money'
import { TablePotCollectingAnimation } from 'src/components/game/templates/animations/TablePotCollectingAnimation'
import { TablePotWinnerAnimation } from 'src/components/game/templates/animations/TablePotWinnerAnimation'
import { isWinnerSeat } from 'src/helpers/clientHelpersPoker'
import { TypePot, TypeTableProps } from 'src/interfaces'

export const TablePot = (props: TypeTableProps & { tablePot: TypePot }) => {
  const { table, tablePot } = props

  const winnerSeats = table.seats.filter(s => isWinnerSeat(s))

  const showMoney = !!tablePot.amount && !winnerSeats.length

  return (
    <div className='dnd-window-body-table-pots-pot'>
      <TablePotCollectingAnimation table={table} />
      <TablePotWinnerAnimation table={table} amount={tablePot.amount} />
      {showMoney && (
        <div className='dnd-window-body-table-pots-pot-money'>
          <Money money={tablePot.amount} showChips />
        </div>
      )}
    </div>
  )
}
