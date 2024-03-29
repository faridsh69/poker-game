import { getAuthUsername } from 'src/helpers/auth'
import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsAchievements = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()

  const authSeat = getUserSeat(table, username)

  if (!authSeat) return null
  if (!authSeat.user.achievement) return null

  return (
    <div className='dnd-window-body-table-actions-achievements'>{authSeat.user.achievement}</div>
  )
}
