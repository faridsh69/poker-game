import { useMemo } from 'react'
import { CLIENT_TIMEOUT_FAULT, TIMER_ACTION_NAMES } from 'src/configs/clientConstantsPoker'
import { getDeadline } from 'src/helpers/clientHelpersPoker'
import { TypeSeat, TypeTimerAction } from 'src/interfaces'

export const useSeatTimer = (seat: TypeSeat | null, action: TypeTimerAction) => {
  const timer = seat?.user.timer

  const remainingSeconds = useMemo(() => {
    if (!timer) {
      return 0
    }

    if (timer.action !== TIMER_ACTION_NAMES[action]) {
      return CLIENT_TIMEOUT_FAULT
    }

    return timer.deadline - getDeadline()
  }, [timer, action])

  return remainingSeconds
}
