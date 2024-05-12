import { isAuthSeat } from 'src/helpers/clientHelpersPoker'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserUsername = (props: TypeSeatProps) => {
  const { seat } = props

  const authSign = isAuthSeat(seat) ? '@' : ''

  return (
    <div className='dnd-window-body-table-seats-seat-user-username'>
      {(authSign + seat.user.username).substring(0, 10)}
    </div>
  )
}
