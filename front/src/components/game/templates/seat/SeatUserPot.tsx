import { useEffect, useState } from 'react'

import { Money } from 'src/components/game/molecules/Money'
import { SeatUserPotThrowingAnimation } from 'src/components/game/templates/animations/SeatUserPotThrowingAnimation'
import { ANIMATION_CSS_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserPot = (props: TypeSeatProps) => {
  const { seat } = props

  const inPot = seat.user.cash.inPot

  const [lastUserPot, setLastUserPot] = useState(inPot)

  useEffect(() => {
    setTimeout(() => {
      setLastUserPot(inPot)
    }, ANIMATION_CSS_POT_DURATION)
  }, [inPot])

  if (!inPot) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-pot'>
      <SeatUserPotThrowingAnimation inPot={inPot} lastUserPot={lastUserPot} />
      <div className='dnd-window-body-table-seats-seat-user-pot-static'>
        <Money money={lastUserPot} showChips />
      </div>
    </div>
  )
}
