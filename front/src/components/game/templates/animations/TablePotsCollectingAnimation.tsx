import { useEffect, useMemo, useState } from 'react'

import { TablePotCollectingAnimation } from './TablePotCollectingAnimation'

import { TRANSITION_CSS_COLLECT_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { getMaximumBet, isFoldSeat, isWithoutCardsSeat } from 'src/helpers/clientHelpersPoker'
import { TypeTablePhase, TypeTableProps, TypeUserPot } from 'src/interfaces'

export const TablePotsCollectingAnimation = (props: TypeTableProps) => {
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

  useEffect(() => {
    setLastTablePhase(table.phase)

    if (lastTablePhase === table.phase) return

    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, TRANSITION_CSS_COLLECT_POT_DURATION)
  }, [table.phase])

  // #3 simulate last status of user pots
  const [userPotsBeforeNextPhase, setUserPotsBeforeNextPhase] = useState<TypeUserPot[]>(userPots)

  useEffect(() => {
    setTimeout(() => {
      setUserPotsBeforeNextPhase(userPots)
    }, TRANSITION_CSS_COLLECT_POT_DURATION)
  }, [userPots])

  if (!showAnimation) return null

  return userPotsBeforeNextPhase.map(userPot => {
    return <TablePotCollectingAnimation userPot={userPot} tablePotId={table.pots.length} key={userPot.seatId} />
  })
}
