import { useAtom } from 'jotai'

import { TypeSeat, TypeTable } from 'src/interfaces'
import emptySeatFleshImage from 'src/images/seat-empty-flesh.png'
import { useCallback } from 'react'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { useAuth } from 'src/hooks/useAuth'

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
      className='dnd-window-body-table-seats-emptyseat'
      onClick={() => handleJoinSeat(table.id, seat.id)}
    >
      <div className='dnd-window-body-table-seats-emptyseat-circle'>
        <img src={emptySeatFleshImage} />
        <p>Take Seat</p>
      </div>
    </div>
  )
}
