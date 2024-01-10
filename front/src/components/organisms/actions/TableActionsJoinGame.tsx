import { useAtom } from 'jotai'

import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { socketAtom } from 'src/contexts/socketAtom'
import { isUserSeatoutTable } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'

export const TableActionsJoinGame = (props: TypeTableProps) => {
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
      <ActionButton label={'Deal Me In'} onClick={handleConfirmJoinGame} />
    </div>
  )
}
