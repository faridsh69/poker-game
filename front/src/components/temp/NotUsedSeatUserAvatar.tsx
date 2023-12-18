import { TypeSeat } from 'src/interfaces/type-game'

export const NotUsedSeatUserAvatar = (props: { seat: TypeSeat }) => {
  const { seat } = props

  return <img src={seat.user.avatar} alt='Avatar' className='seat-user-avatar' />
}
