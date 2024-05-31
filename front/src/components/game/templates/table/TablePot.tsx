import { useMemo } from 'react'

import { Money } from 'src/components/game/molecules/Money'
import { TablePotsCollectingAnimation } from 'src/components/game/templates/animations/TablePotsCollectingAnimation'
import { TablePotsWinnerAnimation } from 'src/components/game/templates/animations/TablePotsWinnerAnimation'
import { TABLE_POT_ID_PREF } from 'src/configs/clientConstantsPoker'
import { getTablePotWinners } from 'src/helpers/clientHelpersPoker'
import { TypePot, TypeTableProps } from 'src/interfaces'

type TypeProps = TypeTableProps & { tablePot: TypePot }

export const TablePot = (props: TypeProps) => {
  const { table, tablePot } = props

  const tablePotWinnerSeats = useMemo(() => {
    return getTablePotWinners(table, tablePot)
  }, [table.seats])

  const showMoney = !!tablePot.amount && !tablePotWinnerSeats.length

  return (
    <div className='dnd-window-body-table-pots-pot' id={`${TABLE_POT_ID_PREF}${tablePot.id}`}>
      <TablePotsCollectingAnimation table={table} tablePot={tablePot} />
      <TablePotsWinnerAnimation table={table} tablePot={tablePot} tablePotWinnerSeats={tablePotWinnerSeats} />

      {showMoney && (
        <div className='dnd-window-body-table-pots-pot-money'>
          <Money money={tablePot.amount} showChips />
        </div>
      )}
    </div>
  )
}
