import { Button, Card, CardContent, CardMedia } from '@mui/material'
import { CLIENT_CHANNELS, TABLE_TYPES } from 'src/configs/clientConstantsPoker'
import { isUserSeatedTable, isUserWaitingTable } from 'src/helpers/clientHelpersPoker'
import { TypeSocket, TypeTable } from 'src/interfaces/type-game'
import holdemImage from 'src/images/holdem.png'
import omahaImage from 'src/images/omaha.png'
import { useCallback } from 'react'

export const TablesList = (props: {
  tables: TypeTable[]
  username: string
  socket: TypeSocket
}) => {
  const { tables, username, socket } = props

  const handleJoinTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.joinTable, { tableId, username })
    },
    [socket, username],
  )

  return tables.map(table => {
    return (
      <Card className='home-tables-table' key={table.id}>
        <CardMedia
          className='home-tables-table-image'
          component='img'
          image={table.type === TABLE_TYPES.holdem ? holdemImage : omahaImage}
          alt={table.type}
        />
        <CardContent className='home-tables-table-content'>
          <b>
            #{table.id} {table.title}
          </b>
          <small>
            FILLED SEATS: {table.seats.filter(s => s.user).length} / {table.seats.length}
          </small>
          <small>PHASE: {table.phase}</small>
          <Button
            variant='contained'
            color='success'
            disabled={isUserSeatedTable(table, username) || isUserWaitingTable(table, username)}
            onClick={() => handleJoinTable(table.id)}
          >
            JOIN TABLE
          </Button>
        </CardContent>
      </Card>
    )
  })
}
