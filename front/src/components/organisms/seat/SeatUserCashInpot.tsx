import { TypeSeat } from 'src/interfaces/type-game'

export const SeatUserCashInpot = (props: { seat: TypeSeat }) => {
  const { seat } = props

  if (!seat.user.cash.inPot) return null

  return <div className='seat-user-inpot'>${seat.user.cash.inPot}</div>
}
