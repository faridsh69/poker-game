import { useAtom } from 'jotai'

import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { isUserSeatoutTable } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'
import sitoutImage from 'src/images/game/sitout.png'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { JoingameTimer } from './details/JoingameTimer'

export const TableActionsJoinGame = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const [, setBuyinModal] = useAtom(buyinModalAtom)

  const { handleJoinGame } = useSocketActions(table.id)

  const handleConfirmJoinGame = () => {
    setBuyinModal({
      show: true,
      table,
      onBuyin: buyinAmount => {
        handleJoinGame(buyinAmount)
        setBuyinModal({ show: false })
      },
    })
  }

  if (!isUserSeatoutTable(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-joingame'>
      <JoingameTimer table={table} />
      <img src={sitoutImage} alt='smoke - wc' />
      <ActionButton label={<div>Deal Me In</div>} onClick={handleConfirmJoinGame} />
    </div>
  )
}
