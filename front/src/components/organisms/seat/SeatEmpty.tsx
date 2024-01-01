import { useAtom } from 'jotai'

import { TypeSeat, TypeTable } from 'src/interfaces'
import { useCallback } from 'react'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { useAuth } from 'src/hooks/useAuth'
import { ArrowBottom } from 'src/components/molecules/ArrowBottom'

export const SeatEmpty = (props: { table: TypeTable; seat: TypeSeat }) => {
  const { table, seat } = props

  const [socket] = useAtom(socketAtom)
  const { username } = useAuth()

  const handleJoinSeat = useCallback(
    (tableId: number, seatId: number) => {
      socket.emit(CLIENT_CHANNELS.joinSeat, { tableId, seatId, username })
    },
    [socket, username],
  )

  return (
    <div
      className='dnd-window-body-table-seats-seat-empty'
      onClick={() => handleJoinSeat(table.id, seat.id)}
    >
      <div className='dnd-window-body-table-seats-seat-empty-circle'>
        <ArrowBottom />
        <p>Take Seat</p>
      </div>
    </div>
  )
}
