import { canSeeTableActionsShowCards, getUserSeat } from 'src/helpers/clientHelpersPoker'
import { ActionButton } from 'src/components/organisms/actions//details/ActionButton'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { GameCard } from 'src/components/organisms/cards/GameCard'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'

export const TableActionsShowCards = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const { handleShowCardAction } = useSocketActions(table.id)

  const authSeat = getUserSeat(table, username)

  if (!authSeat) return null

  if (!canSeeTableActionsShowCards(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-showcards'>
      <div className='dnd-window-body-table-actions-showcards-label'>Show Your Cards:</div>
      <div className='dnd-window-body-table-actions-showcards-buttons'>
        <ActionButton
          label={<GameCard card={authSeat.user.cards[0]} backcard={false} isRabbitcard={false} />}
          onClick={() => handleShowCardAction([0])}
        />
        <ActionButton
          label={<GameCard card={authSeat.user.cards[1]} backcard={false} isRabbitcard={false} />}
          onClick={() => handleShowCardAction([1])}
        />
        <ActionButton
          label={
            <div className='cards'>
              <GameCard card={authSeat.user.cards[0]} backcard={false} isRabbitcard={false} />
              <GameCard card={authSeat.user.cards[1]} backcard={false} isRabbitcard={false} />
            </div>
          }
          onClick={() => handleShowCardAction([0, 1])}
        />
      </div>
    </div>
  )
}
