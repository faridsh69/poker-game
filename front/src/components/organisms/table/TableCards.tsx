import { TypeTable } from 'src/interfaces/type-game'
import { TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { GameCard } from 'src/components/organisms/cards/GameCard'

export const TableCards = (props: { table: TypeTable }) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table-cards'>
      {table.cards.map((card, cardIndex) => {
        const preflopPhase = table.phase == TABLE_PHASES.wait || table.phase == TABLE_PHASES.preflop
        const flopPhase = table.phase == TABLE_PHASES.flop && cardIndex > 2
        const turnPhase = table.phase == TABLE_PHASES.turn && cardIndex > 3

        if (preflopPhase || flopPhase || turnPhase) {
          return null
        }

        return <GameCard card={card} className='' />
      })}
    </div>
  )
}
