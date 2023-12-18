import { TypeSeat } from 'src/interfaces/type-game'

export const NotUsedSeatUserWinner = (props: { seat: TypeSeat }) => {
  const { seat } = props

  if (!seat.user.isWinner) return null

  return <div className='seat-user-winner'>* WINNER *</div>
}
