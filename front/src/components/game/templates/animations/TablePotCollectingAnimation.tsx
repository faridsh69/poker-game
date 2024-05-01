import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'

import { ANIMATION_CSS_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { getMaximumBet, isFoldSeat, isWithoutCardsSeat } from 'src/helpers/clientHelpersPoker'
import { TypeTablePhase, TypeTableProps, TypeUserPot } from 'src/interfaces'
import { Money } from 'src/components/game/molecules/Money'

export const TablePotCollectingAnimation = (props: TypeTableProps) => {
  const { table } = props

  const userPots: TypeUserPot[] = useMemo(() => {
    const maximumInPot = getMaximumBet(table)
    return table.seats
      .map(s => ({
        seatId: s.id,
        inPot: maximumInPot,
        isPlaying: !isFoldSeat(s) && !isWithoutCardsSeat(s),
      }))
      .filter(seat => seat.isPlaying)
  }, [table.seats])

  // #1 only show animation when phase changed
  const [showAnimation, setShowAnimation] = useState(false)

  // #2 stop show animation on Refresh
  const [lastTablePhase, setLastTablePhase] = useState<TypeTablePhase>(table.phase)

  // #1 && #2
  useEffect(() => {
    setLastTablePhase(table.phase)

    if (lastTablePhase === table.phase) return

    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, ANIMATION_CSS_POT_DURATION)
  }, [table.phase])

  // #3 simulate last status of user pots
  const [beforeNextPhaseUserPots, setBeforeNextPhaseUserPots] = useState<TypeUserPot[]>(userPots)

  useEffect(() => {
    setTimeout(() => {
      setBeforeNextPhaseUserPots(userPots)
    }, ANIMATION_CSS_POT_DURATION)
  }, [userPots])

  if (!showAnimation) return null

  return beforeNextPhaseUserPots.map(userPot => {
    return (
      <div
        key={userPot.seatId}
        className={classNames(
          'collecting-pot',
          `seat-${table.seats.length}-${userPot.seatId}-collecting-pot`,
        )}
      >
        <Money money={userPot.inPot} showChips />
      </div>
    )
  })
}
