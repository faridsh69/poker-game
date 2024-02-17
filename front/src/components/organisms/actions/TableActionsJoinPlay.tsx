import { CheckboxAction } from './details/CheckboxAction'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import { canSeeTableActionsJoinPlay, isUserWaitForBB } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const TableActionsJoinPlay = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const { handleWaitForBB } = useSocketActions(table.id)

  const isWaitingForBB = isUserWaitForBB(table, username)

  if (!canSeeTableActionsJoinPlay(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-joinplay'>
      <CheckboxAction
        label='Wait for Big Blind'
        checked={isWaitingForBB}
        onClick={handleWaitForBB}
      />
    </div>
  )
}
