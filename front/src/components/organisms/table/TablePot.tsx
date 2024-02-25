import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { Money } from 'src/components/molecules/Money'
import { ANIMATION_CSS_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { TypeTablePhase, TypeTableProps } from 'src/interfaces'

export const TablePot = (props: TypeTableProps) => {
  const { table } = props

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

  // const [lastTablePot, setLastTablePot] = useState(table.pot)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLastTablePot(table.pot)
  //   }, 2000)
  // }, [table.pot])

  const userPots: { id: number; inPot: number }[] = useMemo(() => {
    return table.seats
      .map(s => ({
        id: s.id,
        inPot: s.user?.cash.inPot || 0,
      }))
      .filter(seat => seat.inPot)
  }, [table.seats])
  const [beforeNextPhaseUserPots, setBeforeNextPhaseUserPots] = useState(userPots)
  useEffect(() => {
    setTimeout(() => {
      setBeforeNextPhaseUserPots(userPots)
    }, ANIMATION_CSS_POT_DURATION)
  }, [userPots])

  if (!table.pot) return null

  return (
    <div className='dnd-window-body-table-pot'>
      {showAnimation &&
        beforeNextPhaseUserPots.map(seat => {
          return (
            <div
              key={seat.id}
              className={classNames(
                `seat-${table.seats.length}-${seat.id}-collecting-pot`,
                'collecting-pot',
              )}
            >
              <Money money={seat.inPot} showChips />
            </div>
          )
        })}
      <Money money={table.pot} showChips />
    </div>
  )
}
