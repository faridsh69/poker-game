import { TypeSeat, TypeTable } from 'src/interfaces'
import { SeatUserAvatar } from 'src/components/organisms/seat/SeatUserAvatar'
import { SeatUserBox } from 'src/components/organisms/seat/SeatUserBox'
import { SeatUserUsername } from 'src/components/organisms/seat/SeatUserUsername'
import { SeatUserCash } from 'src/components/organisms/seat/SeatUserCash'
import { SeatUserCards } from 'src/components/organisms/seat/SeatUserCards'
import { SeatDealer } from 'src/components/organisms/seat/SeatDealer'
import { isShowPhase } from 'src/helpers/clientHelpersPoker'
import { SeatUserPot } from 'src/components/organisms/seat/SeatUserPot'
import { SeatUserStatus } from 'src/components/organisms/seat/SeatUserStatus'
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
      <SeatUserTimer seat={seat} tablePhase={table.phase} />
      <SeatUserCards seat={seat} isShowPhase={isShowPhase(table)} />
      <SeatUserStatus seat={seat} tableId={table.id} />
      <SeatWinner seat={seat} />
      <SeatUserPot seat={seat} />
      <SeatDealer seat={seat} />
      {/* 
      
      <div className='dnd-window-body-table-seats-seat-achievement'></div> */}
    </div>
  )
}
