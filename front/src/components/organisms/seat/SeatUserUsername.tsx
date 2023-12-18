import { TypeSeat } from 'src/interfaces'

export const SeatUserUsername = (props: { seat: TypeSeat }) => {
  const { seat } = props

  return <div className='dnd-window-body-table-seats-seat-user-username'>{seat.user.username}</div>
}
