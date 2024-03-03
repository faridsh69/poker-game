import classNames from 'classnames'
import { TypeSeatProps } from 'src/interfaces'
import UserAvatarsImage from 'src/images/game/avatars.png'
import { getRandomNumber } from 'src/helpers/clientHelpersPoker'

export const SeatUserAvatar = (props: TypeSeatProps) => {
  const { seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user-avatar'>
      <div
        className={classNames(
          'dnd-window-body-table-seats-seat-user-avatar-image',
          `avatar-${seat.user.avatar}`,
          `avatar-${getRandomNumber(10) + 1}`,
        )}
        style={{ backgroundImage: `url(${UserAvatarsImage})` }}
      />
    </div>
  )
}
