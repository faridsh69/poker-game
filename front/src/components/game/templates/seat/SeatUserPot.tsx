import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { Money } from 'src/components/game/molecules/Money'
import { SeatUserPotThrowingAnimation } from 'src/components/game/templates/animations/SeatUserPotThrowingAnimation'
import { SEAT_POT_ID_PREF, TRANSITION_CSS_THROW_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserPot = (props: TypeSeatProps) => {
  const { seat } = props

  const inPot = seat.user.cash.inPot

  const [lastUserPot, setLastUserPot] = useState(inPot)

  useEffect(() => {
    setTimeout(() => {
      setLastUserPot(inPot)
    }, TRANSITION_CSS_THROW_POT_DURATION)
  }, [inPot])

  return (
    <div className={classNames('dnd-window-body-table-seats-seat-user-pot', !inPot && 'no-background')}>
      {!!inPot && <SeatUserPotThrowingAnimation inPot={inPot} lastUserPot={lastUserPot} seatId={seat.id} />}
      <div className='dnd-window-body-table-seats-seat-user-pot-static' id={`${SEAT_POT_ID_PREF}${seat.id}`}>
        {!!inPot && <Money money={lastUserPot} showChips />}
      </div>
    </div>
  )
}
