import { useEffect, useState } from 'react'

import { Money } from 'src/components/game//molecules/Money'
import { ANIMATION_CSS_POT_DURATION } from 'src/configs/clientConstantsPoker'

export const SeatUserPotThrowingAnimation = (props: { inPot: number; lastUserPot: number }) => {
  const { inPot, lastUserPot } = props

  const [restOfUserPotAnimation, setRestOfUserPotAnimation] = useState(0)

  useEffect(() => {
    if (lastUserPot === inPot) return

    setRestOfUserPotAnimation(inPot - lastUserPot)

    setTimeout(() => {
      setRestOfUserPotAnimation(0)
    }, ANIMATION_CSS_POT_DURATION)
  }, [inPot])

  if (!restOfUserPotAnimation) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-pot-throwing'>
      <Money money={restOfUserPotAnimation} showChips />
    </div>
  )
}
