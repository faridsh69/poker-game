import { SeattUserAchievement } from 'src/components/organisms/seat/SeatUserAchievement'
import { SeatUserCashIngame } from 'src/components/organisms/seat/SeatUserCashIngame'
import { isUserWaitingTable } from 'src/helpers/clientHelpersPoker'
import { SeatUserCashInpot } from 'src/components/organisms/seat/SeatUserCashInpot'
import { SeatUserUsername } from 'src/components/organisms/seat/SeatUserUsername'
import { SeatUserDealer } from 'src/components/organisms/seat/SeatUserDealer'
import { SeatUserAvatar } from 'src/components/organisms/seat/SeatUserAvatar'
import { SeatUserWinner } from 'src/components/organisms/seat/SeatUserWinner'
import { SeatUserCards } from 'src/components/organisms/seat/SeatUserCards'
import { TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { SeatEmpty } from 'src/components/organisms/seat/SeatEmpty'
import { TypeTable } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import classNames from 'classnames'
import { SeatUser } from '../seat/SeatUser'

export const TableSeats = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()

  const isAuthUserWaitingTable = isUserWaitingTable(table, username)

  return (
    <div className='dnd-window-body-table-seats'>
      {table.seats.map(s => {
        return (
          <div
            key={s.id}
            className={classNames(
              'dnd-window-body-table-seats-seat',
              `seat-${table.seats.length}-${s.id}`,
              s.user?.username === username && 'dnd-window-body-table-seats-authseat',
              s.user?.gameTurn && 'dnd-window-body-table-seats-turnseat',
            )}
          >
            {!s.user && isAuthUserWaitingTable && <SeatEmpty table={table} seat={s} />}
            {s.user && <SeatUser table={table} seat={s} />}
            {/* {s.user && (
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
            )} */}
          </div>
        )
      })}
    </div>
  )
}
