import { getAuthSeat } from 'src/helpers/clientHelpersPoker'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsAchievements = (props: TypeTableProps) => {
  const { table } = props

  const authSeat = getAuthSeat(table)

  if (!authSeat) return null
  if (!authSeat.user.achievement) return null

  return <div className='popup-table-actions-achievements'>{authSeat.user.achievement}</div>
}
