import { TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { TypeTable } from 'src/interfaces/type-game'

export const TableCards = (props: { table: TypeTable }) => {
  const { table } = props

  return (
    <div className='home-runtable-main-body-tablecards'>
      {table.cards.map((card, cardIndex) => {
        const preflopPhase = table.phase == TABLE_PHASES.wait || table.phase == TABLE_PHASES.preflop
        const flopPhase = table.phase == TABLE_PHASES.flop && cardIndex > 2
        const turnPhase = table.phase == TABLE_PHASES.turn && cardIndex > 3

        if (preflopPhase || flopPhase || turnPhase) {
          // @TODO revert
          // return null
        }

        return (
          <div className='home-runtable-main-body-tablecards-card' key={card.type + card.number}>
            <div className='home-runtable-main-body-tablecards-card-number'>{card.number}</div>
            <img
              className='home-runtable-main-body-tablecards-card-type'
              src={`/${card.type}.png`}
              alt={card.type}
            />
          </div>
        )
      })}
    </div>
  )
}
