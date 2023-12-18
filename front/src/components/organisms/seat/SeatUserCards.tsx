import { TypeSeat } from 'src/interfaces'

import { GameCard } from 'src/components/organisms/cards/GameCard'

export const SeatUserCards = (props: { seat: TypeSeat }) => {
  const { seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        return <GameCard card={card} className={`card-${cardIndex + 1}`} />
      })}
    </div>
  )
}
