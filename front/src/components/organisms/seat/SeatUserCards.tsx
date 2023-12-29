import { TypeSeatAndShowPhaseProps } from 'src/interfaces'

import { GameCard } from 'src/components/organisms/cards/GameCard'
import { isAuthSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import BackCardImage from 'src/components/organisms/cards/back/back4.svg'

export const SeatUserCards = (props: TypeSeatAndShowPhaseProps) => {
  const { seat, isShowPhase } = props

  const { username } = useAuth()

  const isAuth = isAuthSeat(seat, username)

  if (!isAuth && seat.user.cards.length && !isShowPhase) {
    return (
      <div className='dnd-window-body-table-seats-seat-user-cards'>
        <div className='gamecard card-1 backcard'>
          <img src={BackCardImage} alt='hidden card' />
        </div>
        <div className='gamecard card-2 backcard'>
          <img src={BackCardImage} alt='hidden card' />
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
