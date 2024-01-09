import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { TypeTable } from 'src/interfaces'
import { useCallback } from 'react'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { useAuth } from 'src/hooks/useAuth'
import { useAtom } from 'jotai'
import { socketAtom } from 'src/contexts/socketAtom'
import { confirmModalAtom } from 'src/contexts/confirmModalAtom'
import { Money } from 'src/components/molecules/Money'

export const WindowTopBar = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)
  const [, setConfirmModal] = useAtom(confirmModalAtom)

  const handleLeaveTable = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveTable, { tableId: table.id, username })
    setConfirmModal({ show: false })
  }, [socket, table, username, setConfirmModal])

  const handleConfirmLeaveTable = () => {
    setConfirmModal({
      show: true,
      message: 'Are you sure to leave table?',
      onConfirm: handleLeaveTable,
    })
  }

  return (
    <div className='dnd-window-topbar-flex'>
      <div className='dnd-window-topbar-flex-title'>
        NL Hold'em #{table.id} - <Money money={table.blinds.small} /> /{' '}
        <Money money={table.blinds.big} /> - Buy-In <Money money={table.buyin.min} /> -{' '}
        <Money money={table.buyin.max} />
      </div>
      <IconButton onMouseDown={handleConfirmLeaveTable} className='dnd-window-topbar-flex-close'>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
