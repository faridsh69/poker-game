import { TypeSeat } from 'src/interfaces/type-game'

export const SeatUserUsername = (props: { seat: TypeSeat }) => {
  const { seat } = props

  return <div className='seat-user-username'>{seat.user.username}</div>
}
