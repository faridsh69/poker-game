import { useMemo } from 'react'

import { TIMER_ACTION_NAMES, CLIENT_TIMEOUT_FAULT } from 'src/configs/clientConstantsPoker'
import { getDeadline, isFinishPhase, isShowPhase } from 'src/helpers/clientHelpersPoker'
import { TypeSeatProps, TypeTable } from 'src/interfaces'
import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { useSeatTimer } from 'src/hooks/useSeatTimer'

export const SeatUserTimer = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const remainingSeconds = useSeatTimer(seat, 'checkfold')

  const isShowOrFinishPhase = isFinishPhase(table) || isShowPhase(table)

  if (!seat.user?.gameTurn || isShowOrFinishPhase) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-timeout'>
      <CountDownTimer remainingSeconds={remainingSeconds} type='line' />
    </div>
  )
}
