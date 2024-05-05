import { CheckboxAction } from 'src/components/game/templates/actions//details/CheckboxAction'
import { getAuthUsername } from 'src/helpers/auth'
import { canSeeTableActionsJoinPlay, isUserWaitForBB } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsJoinPlay = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()
  const { handleWaitForBB } = useSocketActions(table.id)

  const isWaitingForBB = isUserWaitForBB(table, username)

  if (!canSeeTableActionsJoinPlay(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-joinplay'>
      <CheckboxAction label='Wait for Big Blind' checked={isWaitingForBB} onClick={handleWaitForBB} />
    </div>
  )
}
