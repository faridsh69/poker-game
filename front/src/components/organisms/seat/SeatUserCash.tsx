import { Money } from 'src/components/molecules/Money'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserCash = (props: TypeSeatProps) => {
  const { seat } = props

  if (seat.user.isSeatout) {
    return (
      <div className='dnd-window-body-table-seats-seat-user-cash'>
        <span className='sitting-out'>Sitting Out</span>
      </div>
    )
  }

  if (seat.user.cash.inGame === 0) {
    return (
      <div className='dnd-window-body-table-seats-seat-user-cash '>
        <span className='all-in'>All-In</span>
      </div>
    )
  }

  return (
    <div className='dnd-window-body-table-seats-seat-user-cash'>
      <Money money={seat.user.cash.inGame} />
    </div>
  )
}
