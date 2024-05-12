import { RadioAction } from 'src/components/game/templates/actions/details/RadioAction'
import {
  canSeeTableActionsLeaveGame,
  canSeeTableActionsStradle,
  getAuthSeat,
  isSeatoutNextRoundSeat,
  isStradleSeat,
} from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsLeaveGame = (props: TypeTableProps) => {
  const { table } = props

  const { handleStradle, handleSeatoutNextRound } = useSocketActions(table.id)

  const authSeat = getAuthSeat(table)
  if (!authSeat) return null

  const stradleChecked = isStradleSeat(authSeat)
  const sitoutNextRoundChecked = isSeatoutNextRoundSeat(authSeat)

  if (!canSeeTableActionsLeaveGame(table)) return null

  const canSeeStradle = canSeeTableActionsStradle(table)

  return (
    <div className='dnd-window-body-table-actions-leavegame'>
      {canSeeStradle && <RadioAction checked={stradleChecked} onClick={handleStradle} label='Stradle' />}
      <RadioAction checked={sitoutNextRoundChecked} onClick={handleSeatoutNextRound} label='Sit out next hand' />
    </div>
  )
}
