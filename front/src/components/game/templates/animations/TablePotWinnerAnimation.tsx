import { useEffect, useMemo, useState } from 'react'

import { Money } from 'src/components/game/molecules/Money'
import {
  ANIMATION_CSS_WIN_POT_DELAY,
  ANIMATION_CSS_WIN_POT_DURATION,
  SEAT_POT_ID_PREF,
  TABLE_POT_ID_PREF,
} from 'src/configs/clientConstantsPoker'
import { isWinnerSeat } from 'src/helpers/clientHelpersPoker'
import { TypePot, TypeTablePhase, TypeTableProps } from 'src/interfaces'

type TypeProps = TypeTableProps & { tablePot: TypePot }

export const TablePotWinnerAnimation = (props: TypeProps) => {
  const { table, tablePot } = props

  const winnerSeats = useMemo(() => {
    // tablePot.seatIds
    // Check if winner seat id is inside the pot.seatIds
    return table.seats.filter(s => isWinnerSeat(s))
  }, [table.seats])

  // #1 only show animation when we have winners changed
  const [showAnimation, setShowAnimation] = useState(false)

  // #2 stop show animation on Refresh
  const [lastTablePhase, setLastTablePhase] = useState<TypeTablePhase>(table.phase)

  useEffect(() => {
    setLastTablePhase(table.phase)

    if (!winnerSeats.length) return
    if (lastTablePhase === table.phase) return

    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, ANIMATION_CSS_WIN_POT_DURATION)
  }, [winnerSeats.length])

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  useEffect(() => {
    // console.log('A-1 winnerSeats', winnerSeats)
    const winnerSeatId = winnerSeats[0]?.id
    // console.log('A-2 winnerSeatId', winnerSeatId)
    const destinationEl = document.getElementById(`${SEAT_POT_ID_PREF}${winnerSeatId}`)
    // console.log('A-3 destinationEl', destinationEl)
    const destinationCoordinates = destinationEl?.getBoundingClientRect()
    // console.log('A-4 destinationCoordinates', destinationCoordinates?.left, destinationCoordinates?.top)

    const sourceEl = document.getElementById(`${TABLE_POT_ID_PREF}${tablePot.id}`)
    // console.log('B-1 sourceEl', sourceEl)
    const sourceCoordinates = sourceEl?.getBoundingClientRect()
    // console.log('B-2 sourceCoordinates', sourceCoordinates?.left, sourceCoordinates?.top)

    if (!destinationCoordinates || !sourceCoordinates) return

    setTimeout(() => {
      setLeft(destinationCoordinates.left - sourceCoordinates.left)
      setTop(destinationCoordinates.top - sourceCoordinates.top)
    }, ANIMATION_CSS_WIN_POT_DELAY)
  }, [winnerSeats])

  if (!showAnimation) return null

  return winnerSeats.map(winnerSeat => {
    return (
      <div className='winning-pot' key={winnerSeat.id} style={{ left, top }}>
        <Money money={tablePot.amount} showChips />
      </div>
    )
  })
}
