import { useCallback } from 'react'

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Button, TableCell, TableRow } from '@mui/material'

import { Money } from 'src/components/game/molecules/Money/Money'
// import { canUserJoinTable } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTable } from 'src/interfaces'

// import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

export const TablesItem = (props: { table: TypeTable }) => {
  const { table } = props

  // const { single: authUser } = useCrudProfile()

  const { handleJoinTable } = useSocketActions(table.id)

  const handleOpenTablePopup = useCallback(() => {
    const url = `/tables/${table.id}`

    window.open(url, table.title, 'width=800,height=640,toolbar=0,menubar=0,location=0')
    handleJoinTable(table.id)
  }, [table.id, table.title])

  return (
    <TableRow>
      <TableCell>
        <b>{table.title}</b>
        <br />
        <b>{table.pasoor === 'holdem' && 'Holdem'}</b>
        <b>{table.pasoor === 'omaha4' && 'Omaha 4 Cards'}</b>
        <b>{table.pasoor === 'omaha5' && 'Omaha 5 Cards'}</b>
      </TableCell>
      <TableCell>
        Blinds: <Money money={table.blinds.small} brif /> - <Money money={table.blinds.big} brif />
      </TableCell>
      <TableCell>
        Buy-In: <Money money={table.buyin.min} brif /> - <Money money={table.buyin.max} brif />
      </TableCell>
      <TableCell>
        Filled Seats: {table.seats.filter(s => s.user).length} / {table.seats.length} - {table.phase}
      </TableCell>
      <TableCell>
        <Button
          size='small'
          variant='contained'
          color='success'
          startIcon={<PlayCircleOutlineIcon />}
          // disabled={!canUserJoinTable(table, authUser?.balance as number)}
          onClick={handleOpenTablePopup}
        >
          JOIN TABLE
        </Button>
      </TableCell>
    </TableRow>
  )
}
