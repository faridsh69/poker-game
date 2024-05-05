import { isWinnerSeat } from 'src/helpers/clientHelpersPoker'
import goldCircleHalfImage from 'src/images/game/gold-circle-half.png'
import goldCircleImage from 'src/images/game/gold-circle.png'
import { TypeSeatProps } from 'src/interfaces'

export const SeatWinnerAnimation = (props: TypeSeatProps) => {
  const { seat } = props

  if (!isWinnerSeat(seat)) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-winner'>
      <span className='dnd-window-body-table-seats-seat-user-winner-text' data-heading='WIN'>
        WIN
      </span>
      <img className='dnd-window-body-table-seats-seat-user-winner-image' src={goldCircleImage} alt='Gold' />
      <img className='dnd-window-body-table-seats-seat-user-winner-halfimage' src={goldCircleHalfImage} alt='Moon' />
    </div>
  )
}
