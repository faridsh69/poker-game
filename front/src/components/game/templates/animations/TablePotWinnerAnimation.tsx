import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { ANIMATION_CSS_WIN_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { TypeTablePhase, TypeTableProps } from 'src/interfaces'
import { isWinnerSeat } from 'src/helpers/clientHelpersPoker'
import { Money } from 'src/components/game/molecules/Money'

export const TablePotWinnerAnimation = (props: TypeTableProps & { amount: number }) => {
  const { table, amount } = props

  const winnerSeats = table.seats.filter(s => isWinnerSeat(s))

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
    }, ANIMATION_CSS_WIN_POT_DURATION)
  }, [table.phase])

  if (!showAnimation) return null

  return winnerSeats.map(winnerSeat => {
    return (
      <div
        key={winnerSeat.id}
        className={classNames(
          'winning-pot',
          `seat-${table.seats.length}-${winnerSeat.id}-winning-pot`,
        )}
      >
        <Money money={amount} showChips />
      </div>
    )
  })
}
