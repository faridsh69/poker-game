import { TypeTableProps } from 'src/interfaces'
import { ActionButton } from './details/ActionButton'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { useAuth } from 'src/hooks/useAuth'
import {
  getUserSeat,
  isUserFold,
  isUserHasCard,
  isUserSeatoutTable,
} from 'src/helpers/clientHelpersPoker'
import { GameCard } from '../cards/GameCard'

export const TableActionsShowCards = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const { handleShowCardAction } = useSocketActions(table.id)

  const authSeat = getUserSeat(table, username)

  if (!authSeat) return null
  if (!isUserFold(table, username)) return null
  if (!isUserHasCard(table, username)) return null
  if (isUserSeatoutTable(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-showcards'>
      <div className='dnd-window-body-table-actions-showcards-label'>Show Your Cards:</div>
      <div className='dnd-window-body-table-actions-showcards-buttons'>
        <ActionButton
          label={<GameCard card={authSeat.user.cards[0]} backcard={false} />}
          onClick={() => handleShowCardAction([1])}
        />
        <ActionButton
          label={<GameCard card={authSeat.user.cards[1]} backcard={false} />}
          onClick={() => handleShowCardAction([2])}
        />
        <ActionButton
          label={
            <div className='cards'>
              <GameCard card={authSeat.user.cards[0]} backcard={false} />
              <GameCard card={authSeat.user.cards[1]} backcard={false} />
            </div>
          }
          onClick={() => handleShowCardAction([1, 2])}
        />
      </div>
    </div>
  )
}
