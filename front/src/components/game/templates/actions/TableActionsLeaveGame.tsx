import { RadioAction } from 'src/components/game/templates/actions/details/RadioAction'
import { getAuthUsername } from 'src/helpers/auth'
import {
  canSeeTableActionsLeaveGame,
  canSeeTableActionsStradle,
  getUserSeat,
  isSeatoutNextRoundSeat,
  isStradleSeat,
} from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsLeaveGame = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()

  const { handleStradle, handleSeatoutNextRound } = useSocketActions(table.id)

  const userSeat = getUserSeat(table, username)
  if (!userSeat) return null

  const stradleChecked = isStradleSeat(userSeat)
  const sitoutNextRoundChecked = isSeatoutNextRoundSeat(userSeat)

  if (!canSeeTableActionsLeaveGame(table, username)) return null

  const canSeeStradle = canSeeTableActionsStradle(table)

  return (
    <div className='dnd-window-body-table-actions-leavegame'>
      {canSeeStradle && <RadioAction checked={stradleChecked} onClick={handleStradle} label='Stradle' />}
      <RadioAction checked={sitoutNextRoundChecked} onClick={handleSeatoutNextRound} label='Sit out next hand' />
    </div>
  )
}
