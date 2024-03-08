import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { Money } from 'src/components/molecules/Money'
import { ANIMATION_CSS_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { TypePot, TypeTablePhase, TypeTableProps, TypeUserPot } from 'src/interfaces'

export const TablePot = (props: TypeTableProps & { tablePot: TypePot }) => {
  const { table, tablePot } = props

  const [showAnimation, setShowAnimation] = useState(false)
  const [lastTablePhase, setLastTablePhase] = useState<TypeTablePhase>(table.phase)

  useEffect(() => {
    setLastTablePhase(table.phase)

    if (lastTablePhase === table.phase) return

    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, ANIMATION_CSS_POT_DURATION)
  }, [table.phase])

  const userPots: TypeUserPot[] = useMemo(() => {
    return table.seats
      .map(s => ({
        seatId: s.id,
        inPot: s.user?.cash.inPot || 0,
      }))
      .filter(seat => seat.inPot)
  }, [table.seats])

  const [beforeNextPhaseUserPots, setBeforeNextPhaseUserPots] = useState<TypeUserPot[]>(userPots)

  useEffect(() => {
    setTimeout(() => {
      setBeforeNextPhaseUserPots(userPots)
    }, ANIMATION_CSS_POT_DURATION)
  }, [userPots])

  if (!table.pots.length) return null
  if (!tablePot.amount) return null

  return (
    <div className='dnd-window-body-table-pots-pot'>
      {showAnimation &&
        beforeNextPhaseUserPots.map(userPot => {
          const className = `seat-${table.seats.length}-${userPot.seatId}-collecting-pot`

          return (
            <div key={userPot.seatId} className={classNames(className, 'collecting-pot')}>
              <Money money={userPot.inPot} showChips />
            </div>
          )
        })}
      <Money money={tablePot.amount} showChips />
    </div>
  )
}
