import classNames from 'classnames'
import { GameCard } from 'src/components/game/molecules/cards/GameCard'
import { USER_CARD_CLASS_NAMES } from 'src/configs/clientConstantsPoker'
import { showBackcard } from 'src/helpers/clientHelpersPoker'
import { useUserCardsCoordinatesAnimation } from 'src/hooks/game/useUserCardsCoordinatesAnimation'
import { TypeSeatAnTableProps } from 'src/interfaces'

export const SeatUserCards = (props: TypeSeatAnTableProps) => {
  const { seat, table } = props

  const cardsStyles = useUserCardsCoordinatesAnimation(table, seat)

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
            isRabbitcard={false}
            className={classNames(card.isVisible ? USER_CARD_CLASS_NAMES.visible : '')}
            style={cardsStyles[cardIndex]}
          />
        )
      })}
    </div>
  )
}
