import { SeatUserCards } from 'src/components/poker/molecules/SeatUserCards'
import { TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { isUserWaitingTable } from 'src/helpers/clientHelpersPoker'
import { TypeTable } from 'src/interfaces/type-game'
import { SeatUserDealer } from '../atoms/SeatUserDealer'
import { SeattUserAchievement } from '../atoms/SeattUserAchievement'
import { SeatUserWinner } from '../atoms/SeatUserWinner'
import { SeatUserCashIngame } from '../atoms/SeatUserCashIngame'
import { SeatUserUsername } from '../atoms/SeatUserUsername'
import { SeatUserAvatar } from '../atoms/SeatUserAvatar'
import { SeatUserCashInpot } from '../atoms/SeatUserCashInpot'

export const TableSeats = (props: {
  table: TypeTable
  username: string
  handleSitTableModal: (tableId: number, seatId: number) => void
}) => {
  const { table, username, handleSitTableModal } = props

  const isAuthUserWaitingTable = isUserWaitingTable(table, username)

  return table.seats.map(s => {
    return (
      <div
        key={s.id}
        className={`home-runtable-main-body-seat seat-${s.id} 
          ${s.user?.username === username ? 'seat-auth' : ''}
          ${s.user?.gameTurn ? 'seat-turn' : ''}
        }`}
      >
        {!s.user && isAuthUserWaitingTable && (
          <div className='seat-user' onClick={() => handleSitTableModal(table.id, s.id)}>
            Empty
          </div>
        )}
        {s.user && (
          <div className='seat-user'>
            <SeatUserAvatar seat={s} />
            <SeatUserUsername seat={s} />
            <SeatUserCashIngame seat={s} />
            <SeatUserCashInpot seat={s} />
            <SeatUserWinner seat={s} />
            <SeattUserAchievement seat={s} />
            <SeatUserDealer seat={s} />
            <SeatUserCards
              cards={s.user.cards}
              isAuthSeat={s.user.username === username}
              showPhase={table.phase === TABLE_PHASES.show}
            />
          </div>
        )}
      </div>
    )
  })
}
