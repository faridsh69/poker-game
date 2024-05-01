import { GameCard } from 'src/components/game/molecules/cards/GameCard'
import { TypeTableProps } from 'src/interfaces'
import { useTableCardsAnimation } from 'src/hooks/game/useTableCardsAnimation'
import { calculateIsRabbitcard } from 'src/helpers/clientHelpersPoker'

export const TableCards = (props: TypeTableProps) => {
  const { table } = props

  const { cardClassNames, tableCardLength } = useTableCardsAnimation(table.phase)

  return (
    <div className='dnd-window-body-table-cards'>
      {table.cards.map((card, cardIndex) => {
        const { hideCard, isRabbitcard } = calculateIsRabbitcard(table, tableCardLength, cardIndex)

        if (hideCard) return null

        return (
          <GameCard
            card={card}
            backcard={false}
            key={card.type + card.number}
            className={cardClassNames[cardIndex]}
            isRabbitcard={isRabbitcard}
          />
        )
      })}
    </div>
  )
}
