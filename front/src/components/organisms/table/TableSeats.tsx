import { TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { isUserWaitingTable } from 'src/helpers/clientHelpersPoker'
import { TypeTable } from 'src/interfaces/type-game'
import { SeatUserDealer } from 'src/components/organisms/seat/SeatUserDealer'
import { SeattUserAchievement } from 'src/components/organisms/seat/SeattUserAchievement'
import { SeatUserWinner } from 'src/components/organisms/seat/SeatUserWinner'
import { SeatUserCashIngame } from 'src/components/organisms/seat/SeatUserCashIngame'
import { SeatUserUsername } from 'src/components/organisms/seat/SeatUserUsername'
import { SeatUserAvatar } from 'src/components/organisms/seat/SeatUserAvatar'
import { SeatUserCashInpot } from 'src/components/organisms/seat/SeatUserCashInpot'
import emptySeatImage from 'src/images/seat-empty.png'
import { useAuth } from 'src/hooks/useAuth'
import { SeatUserCards } from 'src/components/organisms/seat/SeatUserCards'

export const TableSeats = (props: {
  table: TypeTable
  handleSitTableModal: (tableId: number, seatId: number) => void
}) => {
  const { table, handleSitTableModal } = props

  const { username } = useAuth()

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
            <img src={emptySeatImage} alt='empty seat' />
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
