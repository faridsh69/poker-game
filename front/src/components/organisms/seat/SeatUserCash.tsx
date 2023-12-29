import { Money } from 'src/components/molecules/Money'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserCash = (props: TypeSeatProps) => {
  const { seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user-cash'>
      <Money money={seat.user.cash.inGame} />
    </div>
  )
}
