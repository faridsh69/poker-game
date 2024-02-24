import { GameCard } from 'src/components/organisms/cards/GameCard'
import { TypeTableProps } from 'src/interfaces'
import { useTableCardsAnimation } from 'src/hooks/game/useTableCardsAnimation'

export const TableCards = (props: TypeTableProps) => {
  const { table } = props

  const { cardClassNames, tableCardLength } = useTableCardsAnimation(table.phase)

  return (
    <div className='dnd-window-body-table-cards'>
      {table.cards.map((card, cardIndex) => {
        if (cardIndex >= tableCardLength) return null

        return (
          <GameCard
            card={card}
            backcard={false}
            key={card.type + card.number}
            className={cardClassNames[cardIndex]}
          />
        )
      })}
    </div>
  )
}
