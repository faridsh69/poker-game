import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsAchievements = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const authSeat = getUserSeat(table, username)

  if (!authSeat) return null
  if (!authSeat.user.achievement) return null

  return (
    <div className='dnd-window-body-table-actions-achievements'>{authSeat.user.achievement}</div>
  )
}
