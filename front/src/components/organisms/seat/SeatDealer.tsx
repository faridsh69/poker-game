import SeatDealerImage from 'src/images/game/dealer.png'
import { TypeSeatProps } from 'src/interfaces'

export const SeatDealer = (props: TypeSeatProps) => {
  const { seat } = props

  if (!seat.user.isDealer) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-dealer'>
      <img src={SeatDealerImage} alt='dealer sign' />
    </div>
  )
}
