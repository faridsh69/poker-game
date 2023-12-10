import { TypeSeat } from 'src/interfaces/type-game'

export const SeatUserDealer = (props: { seat: TypeSeat }) => {
  const { seat } = props

  if (!seat.user.isDealer) return null

  return (
    <div className='seat-user-isdealer'>
      <img src='/dealer.png' alt='dealer' className='seat-user-isdealer-img' />
    </div>
  )
}
