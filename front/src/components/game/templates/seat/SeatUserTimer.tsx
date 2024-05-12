import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { CountDownTimer } from 'src/components/game/molecules/CountDownTimer'
import { CLIENT_TIMEOUT_ACTION, TIMER_ACTION_NAMES } from 'src/configs/clientConstantsPoker'
import { canSeeSeatUserTimer } from 'src/helpers/clientHelpersPoker'
import { useSeatTimer } from 'src/hooks/useSeatTimer'
import { TypeSeatProps, TypeTable } from 'src/interfaces'

export const SeatUserTimer = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const timer = seat.user.timer

  const remainingSeconds = useSeatTimer(seat, TIMER_ACTION_NAMES.checkfold)

  const [forceReset, setForceReset] = useState<boolean>(false)

  useEffect(() => {
    setForceReset(!forceReset)
  }, [table.phase])

  if (!timer) return null
  if (!canSeeSeatUserTimer(table)) return null

  return (
    <div
      className={classNames('dnd-window-body-table-seats-seat-user-timeout', timer.extra && 'seat-user-timeout-extra')}
    >
      <CountDownTimer
        remainingSeconds={remainingSeconds}
        duration={timer.extra ? remainingSeconds : CLIENT_TIMEOUT_ACTION}
        type='line'
        forceReset={forceReset}
      />
    </div>
  )
}
