import { GameCard } from 'src/components/game/molecules/cards/GameCard'
import { TABLE_CENTER_ID_PREF } from 'src/configs/clientConstantsPoker'
import { calculateIsRabbitcard } from 'src/helpers/clientHelpersPoker'
import { useTableCardsAnimation } from 'src/hooks/game/useTableCardsAnimation'
import { TypeTableProps } from 'src/interfaces'

export const TableCards = (props: TypeTableProps) => {
  const { table } = props

  const { cardClassNames, tableCardLength } = useTableCardsAnimation(table.phase)

  return (
    <div className='dnd-window-body-table-cards'>
      <div id={TABLE_CENTER_ID_PREF} className='dnd-window-body-table-cards-center' />
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
