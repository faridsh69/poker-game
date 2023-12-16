import { useCallback } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import {
  isUserSeatedTable,
  isUserSeatoutTable,
  isUserWaitingTable,
} from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { useAtom } from 'jotai'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { socketAtom } from 'src/contexts/socketAtom'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

export const TablesList = () => {
  const { username } = useAuth()
  const [tables] = useAtom(allTablesAtom)
  const [socket] = useAtom(socketAtom)

  const handleJoinTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.joinTable, { tableId, username })
    },
    [socket, username],
  )

  return tables.map(table => {
    return (
      <Card className='home-tables-table' key={table.id}>
        <CardContent>
          <Typography variant='h5' component='div' sx={{ textTransform: 'uppercase' }}>
            {table.type}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Blinds: ${table.small} - ${table.big}
          </Typography>
          <Typography fontSize={12}>
            Buy-In: ${table.buyin.min} - ${table.buyin.max}
          </Typography>
          <Typography fontSize={12}>
            Filled Seats: {table.seats.filter(s => s.user).length} / {table.seats.length}
          </Typography>
          <Typography fontSize={12}>Waiting Users: {table.waitingUsers.length}</Typography>

          <Typography fontSize={12} sx={{ textTransform: 'uppercase' }}>
            Game Phase: {table.phase}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            variant='contained'
            color='success'
            startIcon={<PlayCircleOutlineIcon />}
            disabled={
              isUserSeatedTable(table, username) ||
              isUserWaitingTable(table, username) ||
              isUserSeatoutTable(table, username)
            }
            onClick={() => handleJoinTable(table.id)}
          >
            JOIN TABLE
          </Button>
        </CardActions>
      </Card>
    )
  })
}
