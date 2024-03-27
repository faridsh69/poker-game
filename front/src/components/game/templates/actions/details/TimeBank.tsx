import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { ActionButton } from './ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'

export const TimeBank = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const authSeat = getUserSeat(table, username)
  const timeBank = authSeat?.user.timeBank

  const { handleTimeBankAction } = useSocketActions(table.id)

  if (!timeBank) return null
  if (authSeat.user.timer?.extra) return null

  return (
    <div className='dnd-window-body-table-actions-gameturn-timebank'>
      <ActionButton label={`+${timeBank}`} onClick={handleTimeBankAction} />
    </div>
  )
}
