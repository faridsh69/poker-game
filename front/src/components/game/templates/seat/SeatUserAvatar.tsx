import classNames from 'classnames'
import UserAvatarsImage from 'src/images/game/avatars.png'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserAvatar = (props: TypeSeatProps) => {
  const { seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user-avatar'>
      <div
        className={classNames(
          'dnd-window-body-table-seats-seat-user-avatar-image',
          `avatar-${seat.user.avatar_id || 1}`,
        )}
        style={{ backgroundImage: `url(${UserAvatarsImage})` }}
      />
    </div>
  )
}
