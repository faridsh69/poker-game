import { GameCard } from 'src/components/organisms/cards/GameCard'
import { TypeTableProps } from 'src/interfaces'
import { useTableCardsAnimation } from 'src/hooks/game/useTableCardsAnimation'
import { isShowOrFinishPhase } from 'src/helpers/clientHelpersPoker'

export const TableCards = (props: TypeTableProps) => {
  const { table } = props

  const { cardClassNames, tableCardLength } = useTableCardsAnimation(table.phase)
  const gameFinished = isShowOrFinishPhase(table)

  return (
    <div className='dnd-window-body-table-cards'>
      {table.cards.map((card, cardIndex) => {
        let rabbitcard = false
        if (cardIndex >= tableCardLength) {
          if (!gameFinished) {
            return null
          } else {
            rabbitcard = true

            if (tableCardLength === 0 && cardIndex > 2) {
              return null
            }
          }
        }

        return (
          <GameCard
            card={card}
            backcard={false}
            key={card.type + card.number}
            className={cardClassNames[cardIndex]}
            rabbitcard={rabbitcard}
          />
        )
      })}
    </div>
  )
}
