import { TypeSeat } from 'src/interfaces/type-game'

export const SeatUserCashIngame = (props: { seat: TypeSeat }) => {
  const { seat } = props

  return <div className='seat-user-cash'>${seat.user.cash.inGame}</div>
}
