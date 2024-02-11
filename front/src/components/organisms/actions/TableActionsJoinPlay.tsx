import { CheckboxAction } from './details/CheckboxAction'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import {
  NotSeatOutPlayers,
  getUserSeat,
  isAtLeastTwoNotSeatOutPlayers,
  isUserSeatoutTable,
  isWithCardSeat,
} from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const TableActionsJoinPlay = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const { handleWaitForBB } = useSocketActions(table.id)

  const userSeat = getUserSeat(table, username)

  const isWaitingForBB = userSeat?.user ? userSeat?.user?.isWaitForBB : false

  if (!userSeat) return null
  if (isWithCardSeat(userSeat)) return null
  if (isUserSeatoutTable(table, username)) return null
  if (!isAtLeastTwoNotSeatOutPlayers(table)) return null
  if (NotSeatOutPlayers(table).length < 3) return null

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
