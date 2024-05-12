import classNames from 'classnames'
import { GameCard } from 'src/components/game/molecules/cards/GameCard'
import { USER_CARD_CLASS_NAMES } from 'src/configs/clientConstantsPoker'
import { showBackcard } from 'src/helpers/clientHelpersPoker'
import { useUserCardsAnimation } from 'src/hooks/game/useUserCardsAnimation'
import { TypeSeatProps, TypeTable } from 'src/interfaces'

export const SeatUserCards = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const { cardClassNames } = useUserCardsAnimation(table, seat)

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        const backcard = showBackcard(seat, table, card)

        return (
          <GameCard
            key={card.type + card.number}
            card={card}
            cardIndex={cardIndex}
            backcard={backcard}
            className={classNames(cardClassNames[cardIndex], card.isVisible ? USER_CARD_CLASS_NAMES.visible : '')}
            isRabbitcard={false}
          />
        )
      })}
    </div>
  )
}
