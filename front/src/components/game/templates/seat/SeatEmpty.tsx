import { TypeSeat, TypeTable } from 'src/interfaces'
import { ArrowBottom } from 'src/components/game/molecules/ArrowBottom'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const SeatEmpty = (props: { table: TypeTable; seat: TypeSeat }) => {
  const { table, seat } = props

  const { handleJoinSeat } = useSocketActions(table.id)

  return (
    <div className='dnd-window-body-table-seats-seat-empty' onClick={() => handleJoinSeat(seat.id)}>
      <div className='dnd-window-body-table-seats-seat-empty-circle'>
        <ArrowBottom />
        <p>Take Seat</p>
      </div>
    </div>
  )
}
