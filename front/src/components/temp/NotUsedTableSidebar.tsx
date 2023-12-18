import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { Button } from '@mui/material'

import { isUserSeatedTable, isUserSeatoutTable } from 'src/helpers/clientHelpersPoker'
import { TypeTable } from 'src/interfaces/type-game'
import { useAuth } from 'src/hooks/useAuth'
import { socketAtom } from 'src/contexts/socketAtom'

export const TableSidebar = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const isAuthUserSeatedTable = isUserSeatedTable(table, username)
  const isAuthUserSeatedoutTable = isUserSeatoutTable(table, username)

  return (
    <div className='home-runtable-main-sidebar'>
      <div className='home-runtable-main-sidebar-waitinglist'>
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
