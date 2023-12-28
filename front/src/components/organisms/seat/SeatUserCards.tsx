import { TypeSeatAndShowPhaseProps, TypeSeatProps } from 'src/interfaces'

import { GameCard } from 'src/components/organisms/cards/GameCard'
import { isAuthSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'

export const SeatUserCards = (props: TypeSeatAndShowPhaseProps) => {
  const { seat, isShowPhase } = props

  const { username } = useAuth()

  const isAuth = isAuthSeat(seat, username)

  if (!isAuth && seat.user.cards.length && !isShowPhase) {
    return (
      <div className='dnd-window-body-table-seats-seat-user-cards hidden-card'>
        <div className='gamecard card-1'>
          <img src='/hide-card.png' alt='hidden card' />
        </div>
        <div className='gamecard card-2'>
          <img src='/hide-card.png' alt='hidden card' />
        </div>
      </div>
    )
  }

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        return <GameCard card={card} className={`card-${cardIndex + 1}`} />
      })}
    </div>
  )
}
