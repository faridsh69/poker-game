import { useEffect, useMemo, useState } from 'react'

import { TablePotCollectingAnimation } from './TablePotCollectingAnimation'

import { TRANSITION_CSS_COLLECT_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { getMaximumBet, isAllinSeat, isFoldSeat, isWithoutCardsSeat } from 'src/helpers/clientHelpersPoker'
import { TypePot, TypeTablePhase, TypeTableProps, TypeUserPot } from 'src/interfaces'

export const TablePotsCollectingAnimation = (props: TypeTableProps & { tablePot: TypePot }) => {
  const { table, tablePot } = props

  const lastPotId = table.pots.length

  const userPots: TypeUserPot[] = useMemo(() => {
    const maximumInPot = getMaximumBet(table)

    return table.seats
      .map(s => ({
        seatId: s.id,
        inPot: maximumInPot,
        isPlaying: !isWithoutCardsSeat(s) && !isFoldSeat(s) && !isAllinSeat(s),
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
  const [userPotsReadyToCollect, setUserPotsReadyToCollect] = useState<TypeUserPot[]>(userPots)

  useEffect(() => {
    setTimeout(() => {
      setUserPotsReadyToCollect(userPots)
    }, TRANSITION_CSS_COLLECT_POT_DURATION)
  }, [userPots])

  if (!showAnimation) return <></>
  if (tablePot.id !== lastPotId) return <></>

  return userPotsReadyToCollect.map(userPot => {
    return <TablePotCollectingAnimation userPot={userPot} tablePotId={lastPotId} key={userPot.seatId} />
  })
}
