import { TypeSeat, TypeTable } from 'src/interfaces'
import { SeatUserAvatar } from 'src/components/game/templates/seat/SeatUserAvatar'
import { SeatUserBox } from 'src/components/game/templates/seat/SeatUserBox'
import { SeatUserUsername } from 'src/components/game/templates/seat/SeatUserUsername'
import { SeatUserCash } from 'src/components/game/templates/seat/SeatUserCash'
import { SeatUserCards } from 'src/components/game/templates/seat/SeatUserCards'
import { SeatDealer } from 'src/components/game/templates/seat/SeatDealer'
import { SeatUserPot } from 'src/components/game/templates/seat/SeatUserPot'
import { SeatUserStatus } from 'src/components/game/templates/seat/SeatUserStatus'
import { SeatWinner } from './SeatWinner'
import { SeatUserCountry } from './SeatUserCountry'
import { SeatUserHot } from './SeatUserHot'
import { SeatUserTimer } from './SeatUserTimer'

export const SeatUser = (props: { table: TypeTable; seat: TypeSeat }) => {
  const { seat, table } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user'>
      <SeatUserAvatar seat={seat} />
      <SeatUserBox />
      <SeatUserUsername seat={seat} />
      <SeatUserCountry />
      <SeatUserHot />
      <SeatUserCash seat={seat} />
      <SeatUserCards seat={seat} table={table} />
      <SeatUserStatus seat={seat} tableId={table.id} />
      <SeatWinner seat={seat} />
      <SeatUserPot seat={seat} />
      <SeatDealer seat={seat} />
      <SeatUserTimer seat={seat} table={table} />
    </div>
  )
}
