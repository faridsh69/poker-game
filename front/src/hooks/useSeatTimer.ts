import { useMemo } from 'react'
import { CLIENT_TIMEOUT_FAULT, TIMER_ACTION_NAMES } from 'src/configs/clientConstantsPoker'
import { getDeadline } from 'src/helpers/clientHelpersPoker'
import { TypeSeat, TypeTimerAction } from 'src/interfaces'

export const useSeatTimer = (seat: TypeSeat, action: TypeTimerAction) => {
  const remainingSeconds = useMemo(() => {
    if (seat?.user.timer?.action !== TIMER_ACTION_NAMES[action]) return CLIENT_TIMEOUT_FAULT

    return seat.user.timer.deadline - getDeadline()
  }, [seat, action])

  return remainingSeconds
}
