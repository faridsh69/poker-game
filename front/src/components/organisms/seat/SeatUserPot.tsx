import { useEffect, useState } from 'react'
import { Money } from 'src/components/molecules/Money'
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

  const [restOfUserPotAnimation, setRestOfUserPotAnimation] = useState(0)

  useEffect(() => {
    if (lastUserPot === inPot) return

    setRestOfUserPotAnimation(inPot - lastUserPot)

    setTimeout(() => {
      setRestOfUserPotAnimation(0)
    }, ANIMATION_CSS_POT_DURATION)
  }, [inPot])

  if (!inPot) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-pot'>
      {!!restOfUserPotAnimation && (
        <div className='dnd-window-body-table-seats-seat-user-pot-throwing'>
          <Money money={restOfUserPotAnimation} showChips />
        </div>
      )}

      <div className='dnd-window-body-table-seats-seat-user-pot-static'>
        <Money money={lastUserPot} showChips />
      </div>
    </div>
  )
}
