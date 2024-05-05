import { useCallback } from 'react'

import { ArrowBottom } from 'src/components/game/molecules/ArrowBottom'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeSeat, TypeTable } from 'src/interfaces'

export const SeatEmpty = (props: { table: TypeTable; seat: TypeSeat }) => {
  const { table, seat } = props

  const { handleJoinSeat } = useSocketActions(table.id)

  const handleClickEmptySeat = useCallback((seatId: number) => {
    handleJoinSeat(seatId)
    // We can create atom to trigger handleConfirmJoinGame
  }, [])

  return (
    <div className='dnd-window-body-table-seats-seat-empty' onClick={() => handleClickEmptySeat(seat.id)}>
      <div className='dnd-window-body-table-seats-seat-empty-circle'>
        <ArrowBottom />
        <p>Take Seat</p>
      </div>
    </div>
  )
}
