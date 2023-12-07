import { useCallback } from 'react'
import { Button } from '@mui/material'

import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { isUserSeatedTable } from 'src/helpers/clientHelpersPoker'
import { TypeSocket, TypeTable } from 'src/interfaces/type-game'

export const TableSidebar = (props: { table: TypeTable; username: string; socket: TypeSocket }) => {
  const { table, username, socket } = props

  const isAuthUserSeatedTable = isUserSeatedTable(table, username)

  const handleQuitTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.leaveTable, { tableId, username })
    },
    [socket, username],
  )

  const handleSitoutTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.sitoutTable, { tableId, username })
    },
    [socket, username],
  )

  return (
    <div className='home-runtable-main-sidebar'>
      <div className='home-runtable-main-sidebar-waitinglist'>
        <Button variant='outlined' color='error' onClick={() => handleQuitTable(table.id)}>
          Quit Table
        </Button>
        <br />
        <br />
        {isAuthUserSeatedTable && (
          <Button variant='outlined' color='error' onClick={() => handleSitoutTable(table.id)}>
            Sit Out
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
