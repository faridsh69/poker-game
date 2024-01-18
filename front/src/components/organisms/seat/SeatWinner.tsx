import { TypeSeatProps } from 'src/interfaces'
import goldCircleImage from 'src/images/game/gold-circle.png'
import goldCircleHalfImage from 'src/images/game/gold-circle-half.png'

export const SeatWinner = (props: TypeSeatProps) => {
  const { seat } = props

  if (!seat.user.isWinner) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-winner'>
      <span className='dnd-window-body-table-seats-seat-user-winner-text' data-heading='WIN'>
        WIN
      </span>
      <img
        className='dnd-window-body-table-seats-seat-user-winner-image'
        src={goldCircleImage}
        alt='C'
      />
      <img
        className='dnd-window-body-table-seats-seat-user-winner-halfimage'
        src={goldCircleHalfImage}
        alt='C'
      />
    </div>
  )
}
