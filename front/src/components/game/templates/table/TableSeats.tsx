import classNames from 'classnames'

import {
  getUserCardsCount,
  isAuthSeat,
  isFoldSeat,
  isUserGameTurn,
  isUserWaitingTable,
} from 'src/helpers/clientHelpersPoker'
import { SeatEmpty } from 'src/components/game/templates/seat/SeatEmpty'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import { SeatUser } from '../seat/SeatUser'

export const TableSeats = (props: TypeTableProps) => {
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
