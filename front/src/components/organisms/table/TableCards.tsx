import { GameCard } from 'src/components/organisms/cards/GameCard'
import { TypeTableProps } from 'src/interfaces'
import { useEffect, useState } from 'react'
import { TABLE_PHASES } from 'src/configs/clientConstantsPoker'

export const TableCards = (props: TypeTableProps) => {
  const { table } = props

  const [lastStateOfTablePhase, setLastStateOfTablePhase] = useState(table.phase)

  useEffect(() => {
    if (table.phase === TABLE_PHASES.finish) return

    setLastStateOfTablePhase(table.phase)
  }, [table.phase])

  return (
    <div className='dnd-window-body-table-cards'>
      {table.cards.map((card, cardIndex) => {
        const preflopPhase =
          lastStateOfTablePhase === TABLE_PHASES.wait ||
          lastStateOfTablePhase === TABLE_PHASES.preflop

        const flopPhase = lastStateOfTablePhase === TABLE_PHASES.flop && cardIndex > 2

        const turnPhase = lastStateOfTablePhase === TABLE_PHASES.turn && cardIndex > 3

        if (preflopPhase || flopPhase || turnPhase) {
          return null
        }

        return <GameCard card={card} backcard={false} key={card.type + card.number} />
      })}
    </div>
  )
}
