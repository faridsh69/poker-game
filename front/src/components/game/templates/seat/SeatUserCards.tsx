import classNames from 'classnames'

import { GameCard } from 'src/components/game/molecules/cards/GameCard'
import { showBackcard } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeSeatProps, TypeTable } from 'src/interfaces'
import { USER_CARD_CLASS_NAMES } from 'src/configs/clientConstantsPoker'
import { useUserCardsAnimation } from 'src/hooks/game/useUserCardsAnimation'

export const SeatUserCards = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const { username } = useAuth()

  const { cardClassNames } = useUserCardsAnimation(table, seat)

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        const backcard = showBackcard(seat, username, table, card)

        return (
          <GameCard
            key={card.type + card.number}
            card={card}
            cardIndex={cardIndex}
            backcard={backcard}
            className={classNames(
              cardClassNames[cardIndex],
              card.isVisible ? USER_CARD_CLASS_NAMES.visible : '',
            )}
            isRabbitcard={false}
          />
        )
      })}
    </div>
  )
}
