import { useCallback } from 'react'
import { Button } from '@mui/material'

import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import {
  isUserSeatedTable,
  isUserSeatoutTable,
  isUserWaitingTable,
} from 'src/helpers/clientHelpersPoker'
import { TypeSocket, TypeTable } from 'src/interfaces/type-game'

export const TableSidebar = (props: { table: TypeTable; username: string; socket: TypeSocket }) => {
  const { table, username, socket } = props

  const isAuthUserSeatedTable = isUserSeatedTable(table, username)
  const isAuthUserSeatedoutTable = isUserSeatoutTable(table, username)

  const handleLeaveTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.leaveTable, { tableId, username })
    },
    [socket, username],
  )

  const handleLeaveSeat = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.leaveSeat, { tableId, username })
    },
    [socket, username],
  )

  const handleJoinGame = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.joinGame, { tableId, username })
    },
    [socket, username],
  )

  const handleLeaveGame = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.leaveGame, { tableId, username })
    },
    [socket, username],
  )

  return (
    <div className='home-runtable-main-sidebar'>
      <div className='home-runtable-main-sidebar-waitinglist'>
        <Button variant='outlined' color='error' onClick={() => handleLeaveTable(table.id)}>
          Leave Table
        </Button>
        <br />
        <br />
        {(isAuthUserSeatedTable || isAuthUserSeatedoutTable) && (
          <Button variant='outlined' color='error' onClick={() => handleLeaveSeat(table.id)}>
            Leave seat
          </Button>
        )}
        <br />
        <br />
        {isAuthUserSeatedTable && (
          <Button variant='outlined' color='error' onClick={() => handleLeaveGame(table.id)}>
            Leave Game || Sit out = Checkbox
          </Button>
        )}
        <br />
        <br />
        {isAuthUserSeatedoutTable && (
          <Button variant='outlined' color='success' onClick={() => handleJoinGame(table.id)}>
            Join Game || Ready
          </Button>
        )}
        <br />
        <br />
        Waiting List:
        <ul>
          {table.waitingUsers.map((u, uIndex) => {
            return <li key={uIndex}>{u.username}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
