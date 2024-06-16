import { useEffect, useMemo, useState } from 'react'

import { TableActions } from 'src/components/game/templates/table/TableActions'
import { TableBackground } from 'src/components/game/templates/table/TableBackground'
import { TableCards } from 'src/components/game/templates/table/TableCards'
import { TablePots } from 'src/components/game/templates/table/TablePots'
import { TableSeats } from 'src/components/game/templates/table/TableSeats'
import { TableTotalPot } from 'src/components/game/templates/table/TableTotalPot'
import { TypeTableProps } from 'src/interfaces'

export const TableWindow = (props: TypeTableProps) => {
  const { table } = props

  return (
    <div className='popup-table'>
      <TableBackground />
      <TableTotalPot table={table} />
      <TableCards table={table} />
      <TablePots table={table} />
      <TableSeats table={table} />
      <TableActions table={table} />
    </div>
  )
}
