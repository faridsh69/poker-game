import { TypeSeat } from 'src/interfaces/type-game'

export const NotUsedSeattUserAchievement = (props: { seat: TypeSeat }) => {
  const { seat } = props

  if (!seat.user.achievement) return null

  return <div className='seat-user-achievement'>{seat.user.achievement}</div>
}
