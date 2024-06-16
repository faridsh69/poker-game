import { useEffect, useState } from 'react'

import { useAtom } from 'jotai'

import { ANIMATION_CSS_WIN_POT_DELAY, TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { finishedAllCardsAnimationAtom } from 'src/contexts/finishedAllCardsAnimationAtom'
import { isWinnerSeat } from 'src/helpers/clientHelpersPoker'
import goldCircleHalfImage from 'src/images/game/gold-circle-half.png'
import goldCircleImage from 'src/images/game/gold-circle.png'
import { TypeSeat, TypeSeatAnTableProps } from 'src/interfaces'

export const SeatWinnerAnimation = (props: TypeSeatAnTableProps) => {
  const { seat, table } = props

  const [lastTableSeat, setLastTableSeat] = useState<TypeSeat>(seat)

  const [finishedAllCardsAnimation, setFinishedAllCardsAnimation] = useAtom(finishedAllCardsAnimationAtom)

  // Age ke winnerPotId balatar az 2 bashim, va to table pots ma usersi ke to on pot darim 1 nafar bashe inja winner neshonesh nadim

  useEffect(() => {
    if (!finishedAllCardsAnimation) return

    if (table.phase === TABLE_PHASES.preflop) {
      setLastTableSeat(seat)
      setFinishedAllCardsAnimation(false)
    }

    setTimeout(() => {
      setLastTableSeat(seat)
    }, ANIMATION_CSS_WIN_POT_DELAY)
  }, [finishedAllCardsAnimation, table.phase])

  if (!isWinnerSeat(lastTableSeat)) return null

  return (
    <div className='popup-table-seats-seat-user-winner'>
      <span className='popup-table-seats-seat-user-winner-text' data-heading='WIN'>
        WIN
      </span>
      <img className='popup-table-seats-seat-user-winner-image' src={goldCircleImage} alt='Gold' />
      <img className='popup-table-seats-seat-user-winner-halfimage' src={goldCircleHalfImage} alt='Moon' />
    </div>
  )
}
