import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { ActionButton } from './ActionButton'
import { TypeSeat } from 'src/interfaces'

export const TimeBank = (props: { tableId: number; seat: TypeSeat | null }) => {
  const { tableId, seat } = props

  const timeBank = seat?.user.timeBank

  const { handleTimeBankAction } = useSocketActions(tableId)

  if (!timeBank || seat.user.timer?.extra) return null

  return (
    <div className='dnd-window-body-table-actions-gameturn-timebank'>
      <ActionButton label={`+${timeBank}`} onClick={handleTimeBankAction} />
    </div>
  )
}
