import timerImage from 'src/images/game/timer.png'
import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { TypeTableProps } from 'src/interfaces'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { useAuth } from 'src/hooks/useAuth'
import { getDeadline, getUserSeat } from 'src/helpers/clientHelpersPoker'

export const JoingameTimer = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const { handleLeaveSeat } = useSocketActions(table.id)

  const authSeat = getUserSeat(table, username)
  const leaveSeatDeadline = authSeat?.user.timer?.deadline || 0
  const remainingSeconds = leaveSeatDeadline - getDeadline()

  return (
    <div className='dnd-window-body-table-actions-joingame-timer'>
      <img src={timerImage} alt='timer' />
      <CountDownTimer
        remainingSeconds={remainingSeconds}
        onFinishTimer={handleLeaveSeat}
        type='text'
      />
    </div>
  )
}
