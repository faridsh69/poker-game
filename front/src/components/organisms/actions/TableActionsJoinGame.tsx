import { Button } from '@mui/material'
import { useAtom } from 'jotai'

import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { socketAtom } from 'src/contexts/socketAtom'
import { isUserSeatoutTable } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTable } from 'src/interfaces'

export const TableActionsJoinGame = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)
  const [, setBuyinModal] = useAtom(buyinModalAtom)

  const handleJoinGame = (buyinAmount: number) => {
    socket.emit(CLIENT_CHANNELS.joinGame, { tableId: table.id, username, buyinAmount })
    setBuyinModal({ show: false })
  }

  const handleConfirmJoinGame = () => {
    setBuyinModal({
      show: true,
      table,
      onBuyin: buyinAmount => handleJoinGame(buyinAmount),
    })
  }

  if (!isUserSeatoutTable(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-joingame'>
      <Button color='error' variant='contained' onClick={handleConfirmJoinGame}>
        Deal Me In
      </Button>
    </div>
  )
}
