import timerImage from 'src/images/game/timer.png'
import { CountDownTimer } from 'src/components/game/molecules/CountDownTimer'
import { TypeTableProps } from 'src/interfaces'
import { getAuthUsername } from 'src/helpers/auth'
import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useSeatTimer } from 'src/hooks/useSeatTimer'

export const JoingameTimer = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()

  const authSeat = getUserSeat(table, username)
  const remainingSeconds = useSeatTimer(authSeat, 'leaveSeat')

  return (
    <div className='dnd-window-body-table-actions-joingame-timer'>
      <img src={timerImage} alt='timer' />
      <CountDownTimer remainingSeconds={remainingSeconds} onFinishTimer={() => {}} type='text' />
    </div>
  )
}
