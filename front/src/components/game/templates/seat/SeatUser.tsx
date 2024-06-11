import { SeatWinnerAnimation } from 'src/components/game/templates/animations/SeatWinnerAnimation'
import { SeatDealer } from 'src/components/game/templates/seat/SeatDealer'
import { SeatUserAvatar } from 'src/components/game/templates/seat/SeatUserAvatar'
import { SeatUserBox } from 'src/components/game/templates/seat/SeatUserBox'
import { SeatUserCards } from 'src/components/game/templates/seat/SeatUserCards'
import { SeatUserCash } from 'src/components/game/templates/seat/SeatUserCash'
import { SeatUserCountry } from 'src/components/game/templates/seat/SeatUserCountry'
import { SeatUserHot } from 'src/components/game/templates/seat/SeatUserHot'
import { SeatUserPot } from 'src/components/game/templates/seat/SeatUserPot'
import { SeatUserStatus } from 'src/components/game/templates/seat/SeatUserStatus'
import { SeatUserTimer } from 'src/components/game/templates/seat/SeatUserTimer'
import { SeatUserUsername } from 'src/components/game/templates/seat/SeatUserUsername'
import { TypeSeat, TypeTable } from 'src/interfaces'

export const SeatUser = (props: { table: TypeTable; seat: TypeSeat }) => {
  const { seat, table } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user'>
      <SeatUserAvatar seat={seat} />
      <SeatUserBox />
      <SeatUserUsername seat={seat} />
      <SeatUserCountry />
      <SeatUserHot />
      <SeatUserCash seat={seat} table={table} />
      <SeatUserCards seat={seat} table={table} />
      <SeatUserStatus seat={seat} tableId={table.id} />
      <SeatWinnerAnimation seat={seat} table={table} />
      <SeatUserPot seat={seat} />
      <SeatDealer seat={seat} />
      <SeatUserTimer seat={seat} table={table} />
    </div>
  )
}
