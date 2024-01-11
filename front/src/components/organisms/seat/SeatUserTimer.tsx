import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { USER_ACTION_THINKING_TIMEOUT_SECONDS } from 'src/configs/clientConstantsPoker'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserTimer = (props: TypeSeatProps) => {
  const { seat } = props

  if (!seat.user?.gameTurn) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-timeout'>
      <CountDownTimer
        timeout={USER_ACTION_THINKING_TIMEOUT_SECONDS}
        onFinishTimer={() => {}}
        circle={false}
        showText={false}
      />
    </div>
  )
}
