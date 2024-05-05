import { ActionButton } from 'src/components/game/templates/actions/details/ActionButton'
import { getAuthUsername } from 'src/helpers/auth'
import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const TimeBank = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()

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
