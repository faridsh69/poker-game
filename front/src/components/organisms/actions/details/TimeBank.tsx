import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { ActionButton } from './ActionButton'
import { TypeSeat } from 'src/interfaces'

export const TimeBank = (props: { tableId: number; seat: TypeSeat }) => {
  const { tableId, seat } = props

  const { handleTimeBankAction } = useSocketActions(tableId)

  // SERVER_TIMEOUT_EXTRA
  return (
    <div className='dnd-window-body-table-actions-gameturn-timebank'>
      <ActionButton label={`+${seat.user.timeBank}`} onClick={handleTimeBankAction} />
    </div>
  )
}
