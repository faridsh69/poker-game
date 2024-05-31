import { useEffect, useState } from 'react'

import { TablePotWinnerAnimation } from './TablePotWinnerAnimation'

import { ANIMATION_CSS_WIN_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { TypePot, TypeSeat, TypeTablePhase, TypeTableProps } from 'src/interfaces'

type TypeProps = TypeTableProps & { tablePot: TypePot; tablePotWinnerSeats: TypeSeat[] }

export const TablePotsWinnerAnimation = (props: TypeProps) => {
  const { table, tablePot, tablePotWinnerSeats } = props

  // #1 only show animation when we have winners changed
  const [showAnimation, setShowAnimation] = useState(false)

  // #2 stop show animation on Refresh
  const [lastTablePhase, setLastTablePhase] = useState<TypeTablePhase>(table.phase)

  useEffect(() => {
    setLastTablePhase(table.phase)

    if (!tablePotWinnerSeats.length) return
    if (lastTablePhase === table.phase) return

    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, ANIMATION_CSS_WIN_POT_DURATION)
  }, [tablePotWinnerSeats.length])

  if (!showAnimation) return null

  return tablePotWinnerSeats.map(winnerSeat => {
    return <TablePotWinnerAnimation winnerSeatId={winnerSeat.id} tablePot={tablePot} key={winnerSeat.id} />
  })
}
