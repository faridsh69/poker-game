import { TypeSeat, TypeTable } from 'src/interfaces'
import { SeatUserAvatar } from './SeatUserAvatar'
import { SeatUserBox } from './SeatUserBox'
import { SeatUserUsername } from './SeatUserUsername'
import { SeatUserCash } from './SeatUserCash'
import { SeatUserCards } from './SeatUserCards'
import { SeatDealer } from './SeatDealer'
import { isShowPhase } from 'src/helpers/clientHelpersPoker'

export const SeatUser = (props: { table: TypeTable; seat: TypeSeat }) => {
  const { seat, table } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user'>
      <SeatUserAvatar seat={seat} />
      <SeatUserBox />
      <SeatUserUsername seat={seat} />
      <SeatUserCash seat={seat} />
      <SeatUserCards seat={seat} isShowPhase={isShowPhase(table)} />
      <SeatDealer seat={seat} />
      {/* <div className='dnd-window-body-table-seats-seat-user-status'></div>
      <div className='dnd-window-body-table-seats-seat-user-hot'></div>
      <div className='dnd-window-body-table-seats-seat-user-country'></div>
      <div className='dnd-window-body-table-seats-seat-pot'></div>
      <div className='dnd-window-body-table-seats-seat-winner'></div>
      <div className='dnd-window-body-table-seats-seat-achievement'></div> */}
    </div>
  )
}
