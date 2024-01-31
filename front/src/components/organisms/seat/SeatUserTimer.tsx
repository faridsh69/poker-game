import { CLIENT_TIMEOUT_ACTION, CLIENT_TIMEOUT_EXTRA } from 'src/configs/clientConstantsPoker'
import { isFinishPhase, isShowPhase, isUserGameTurn } from 'src/helpers/clientHelpersPoker'
import { TypeSeatProps, TypeTable } from 'src/interfaces'
import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { useSeatTimer } from 'src/hooks/useSeatTimer'
import classNames from 'classnames'

export const SeatUserTimer = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const timer = seat.user.timer

  const remainingSeconds = useSeatTimer(seat, 'checkfold')

  const isShowOrFinishPhase = isFinishPhase(table) || isShowPhase(table)

  if (!isUserGameTurn(table, seat.user.username) || isShowOrFinishPhase || !timer) return null

  return (
    <div
      className={classNames(
        'dnd-window-body-table-seats-seat-user-timeout',
        timer.extra && 'seat-user-timeout-extra',
      )}
    >
      <CountDownTimer
        remainingSeconds={remainingSeconds}
        type='line'
        duration={timer.extra ? CLIENT_TIMEOUT_EXTRA : CLIENT_TIMEOUT_ACTION}
      />
    </div>
  )
}
