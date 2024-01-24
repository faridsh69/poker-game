import { useAtom } from 'jotai'

import { CLIENT_TIMEOUT_SEATOUT } from 'src/configs/clientConstantsPoker'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { isUserSeatoutTable } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'
import sitoutImage from 'src/images/game/sitout.png'
import timerImage from 'src/images/game/timer.png'
import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const TableActionsJoinGame = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const [, setBuyinModal] = useAtom(buyinModalAtom)

  const { handleJoinGame, handleLeaveSeat } = useSocketActions(table.id)

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
      <div className='dnd-window-body-table-actions-joingame-timer'>
        <img src={timerImage} alt='timer' />
        <CountDownTimer
          remainingSeconds={CLIENT_TIMEOUT_SEATOUT}
          onFinishTimer={handleLeaveSeat}
          type='text'
        />
      </div>
      <img src={sitoutImage} alt='smoke - wc' />

      <ActionButton label={<div>Deal Me In</div>} onClick={handleConfirmJoinGame} />
    </div>
  )
}
