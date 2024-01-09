import { TypeSeatProps } from 'src/interfaces'

export const SeatWinner = (props: TypeSeatProps) => {
  const { seat } = props

  if (!seat.user.isWinner) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-winner'>
      <span data-heading='WIN'>WIN</span>
    </div>
  )
}
