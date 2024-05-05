import classNames from 'classnames'
import { SeatEmpty } from 'src/components/game/templates/seat/SeatEmpty'
import { SeatUser } from 'src/components/game/templates/seat/SeatUser'
import { getAuthUsername } from 'src/helpers/auth'
import {
  getUserCardsCount,
  isAuthSeat,
  isFoldSeat,
  isUserGameTurn,
  isUserWaitingTable,
} from 'src/helpers/clientHelpersPoker'
import { TypeTableProps } from 'src/interfaces'

export const TableSeats = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()

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
              `seat-pasoor-${getUserCardsCount(table.pasoor)}`,
              isAuthSeat(s, username) && 'dnd-window-body-table-seats-authseat',
              isFoldSeat(s) && 'dnd-window-body-table-seats-foldSeat',
              isUserGameTurn(table, s.user?.username) && 'dnd-window-body-table-seats-turnseat',
            )}
          >
            {!s.user && isAuthUserWaitingTable && <SeatEmpty table={table} seat={s} />}
            {s.user && <SeatUser table={table} seat={s} />}
          </div>
        )
      })}
    </div>
  )
}
