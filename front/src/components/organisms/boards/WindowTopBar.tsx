import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { TypeTable } from 'src/interfaces'
import { useCallback } from 'react'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { useAuth } from 'src/hooks/useAuth'
import { useAtom } from 'jotai'
import { socketAtom } from 'src/contexts/socketAtom'

export const WindowTopBar = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const handleLeaveTable = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveTable, { tableId: table.id, username })
  }, [socket, table, username])

  return (
    <div className='dnd-window-topbar-flex'>
      <div className='dnd-window-topbar-flex-title'>
        #{table.id} - ${table.title}
      </div>
      <IconButton onMouseDown={handleLeaveTable} sx={{ zIndex: 99999999 }}>
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </div>
  )
}
