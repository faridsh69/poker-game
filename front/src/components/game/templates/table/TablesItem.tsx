import { useCallback } from 'react'

import { ActionButton } from '../actions/details/ActionButton'
import GifIcon from '@mui/icons-material/TableRestaurant'
import { TableCell, TableRow } from '@mui/material'

import { Money } from 'src/components/game/molecules/Money/Money'
import { TypeTable } from 'src/interfaces'

export const TablesItem = (props: { table: TypeTable }) => {
  const { table } = props

  const handleOpenTablePopup = useCallback(() => {
    const url = `/tables/${table.id}`

    window.open(url, table.title, 'width=800,height=640,toolbar=0,menubar=0,location=0')
  }, [table.id, table.title])

  return (
    <TableRow className='holdem-table'>
      <TableCell>
        <div className='holdem-table-title'>
          <GifIcon />
          {table.title}
        </div>
      </TableCell>
      <TableCell>
        <div className='holdem-table-buyin'>
          <Money money={table.buyin.min} brif noDigits />
        </div>
      </TableCell>
      <TableCell>
        <div className='holdem-table-stak'>
          <Money money={table.blinds.small} brif /> / <Money money={table.blinds.big} brifholdem-table />
        </div>
      </TableCell>
      <TableCell>
        <div className='holdem-table-size'>
          {table.seats.filter(s => s.user).length} / {table.seats.length}
        </div>
      </TableCell>
      <TableCell>
        <div className='holdem-table-join'>
          <ActionButton label='Join' onClick={handleOpenTablePopup} />
        </div>
      </TableCell>
    </TableRow>
  )
}
