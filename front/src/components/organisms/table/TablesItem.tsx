import { Button } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

import { canUserJoinTable } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { Money } from 'src/components/molecules/Money'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTable } from 'src/interfaces'

export const TablesItem = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()

  const { handleJoinTable } = useSocketActions(table.id)

  return (
    <div className='home-tables-table'>
      <div className='home-tables-table-content'>
        <div>
          <b>{table.pasoor === 'holdem' && 'Holdem'}</b>
          <b>{table.pasoor === 'omaha4' && 'Omaha 4 Cards'}</b>
          <b>{table.pasoor === 'omaha5' && 'Omaha 5 Cards'}</b>
        </div>
        <div>
          Blinds: <Money money={table.blinds.small} /> - <Money money={table.blinds.big} />
        </div>
        <div>
          Buy-In: <Money money={table.buyin.min} /> - <Money money={table.buyin.max} />
        </div>
        <div>
          Filled Seats: {table.seats.filter(s => s.user).length} / {table.seats.length}
        </div>
        <div>Waiting Users: {table.waitingUsers.length}</div>

        <div>Game Phase: {table.phase}</div>
      </div>
      <div className='home-tables-table-action'>
        <Button
          size='small'
          variant='contained'
          color='success'
          startIcon={<PlayCircleOutlineIcon />}
          disabled={!canUserJoinTable(table, username)}
          onClick={() => handleJoinTable(table.id)}
        >
          JOIN TABLE
        </Button>
      </div>
    </div>
  )
}
