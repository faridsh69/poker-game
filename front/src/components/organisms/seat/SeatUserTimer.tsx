import { useEffect, useState } from 'react'
import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { TABLE_PHASES, CLIENT_TIMEOUT_ACTION } from 'src/configs/clientConstantsPoker'
import { TypeSeatProps, TypeTablePhase } from 'src/interfaces'

export const SeatUserTimer = (props: TypeSeatProps & { tablePhase: TypeTablePhase }) => {
  const { seat, tablePhase } = props

  const [showTimer, setShowTimer] = useState<boolean>(false)

  useEffect(() => {
    setShowTimer(false)
    setTimeout(() => {
      setShowTimer(true)
    }, 100)
  }, [tablePhase])

  const roundFinished = tablePhase === TABLE_PHASES.show || tablePhase === TABLE_PHASES.finish

  if (!seat.user?.gameTurn || !showTimer || roundFinished) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-timeout'>
      <CountDownTimer
        remainingSeconds={CLIENT_TIMEOUT_ACTION}
        onFinishTimer={() => {}}
        type='line'
      />
    </div>
  )
}
