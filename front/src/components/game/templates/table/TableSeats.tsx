import classNames from 'classnames'
import { SeatEmpty } from 'src/components/game/templates/seat/SeatEmpty'
import { SeatUser } from 'src/components/game/templates/seat/SeatUser'
import { SEAT_ID_PREF } from 'src/configs/clientConstantsPoker'
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

  const isAuthUserWaitingTable = isUserWaitingTable(table)

  return (
    <div className='dnd-window-body-table-seats'>
      {table.seats.map(s => {
        return (
          <div
            id={SEAT_ID_PREF + s.id}
            key={s.id}
            className={classNames(
              'dnd-window-body-table-seats-seat',
              `seat-${table.seats.length}-${s.id}`,
              `seat-pasoor-${getUserCardsCount(table.pasoor)}`,
              isAuthSeat(s) && 'dnd-window-body-table-seats-authseat',
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
