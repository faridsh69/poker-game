import { CheckboxAction } from 'src/components/game/templates/actions//details/CheckboxAction'
import { canSeeTableActionsJoinPlay, getIsAuthWaitForBB } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsJoinPlay = (props: TypeTableProps) => {
  const { table } = props

  const { handleWaitForBB } = useSocketActions(table.id)

  const isAuthWaitForBB = getIsAuthWaitForBB(table)

  if (!canSeeTableActionsJoinPlay(table)) return null

  return (
    <div className='popup-table-actions-joinplay'>
      <CheckboxAction label='Wait for Big Blind' checked={isAuthWaitForBB} onClick={handleWaitForBB} />
    </div>
  )
}
