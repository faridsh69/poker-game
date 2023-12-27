import classNames from 'classnames'
import { TypeSeatProps } from 'src/interfaces'
import UserAvatarsImage from 'src/images/avatars.png'

export const SeatUserAvatar = (props: TypeSeatProps) => {
  const { seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user-avatar'>
      <div
        className={classNames(
          'dnd-window-body-table-seats-seat-user-avatar-image',
          `avatar-${seat.user.avatar}`,
        )}
        style={{ backgroundImage: `url(${UserAvatarsImage})` }}
      />
    </div>
  )
}
