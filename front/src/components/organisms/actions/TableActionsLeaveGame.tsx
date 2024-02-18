import {
  canSeeTableActionsLeaveGame,
  getUserSeat,
  isSeatoutNextRoundSeat,
  isStradleSeat,
} from 'src/helpers/clientHelpersPoker'
import { RadioAction } from 'src/components/organisms/actions/details/RadioAction'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'

export const TableActionsLeaveGame = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const { handleStradle, handleSeatoutNextRound } = useSocketActions(table.id)

  const userSeat = getUserSeat(table, username)
  if (!userSeat) return null

  const stradleChecked = isStradleSeat(userSeat)
  const sitoutNextRoundChecked = isSeatoutNextRoundSeat(userSeat)

  if (!canSeeTableActionsLeaveGame(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-leavegame'>
      <RadioAction checked={stradleChecked} onClick={handleStradle} label='Stradle' />
      <RadioAction
        checked={sitoutNextRoundChecked}
        onClick={handleSeatoutNextRound}
        label='Sit out next hand'
      />
    </div>
  )
}
