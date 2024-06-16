import { GameCard } from 'src/components/game/molecules/cards/GameCard'
import { ActionButton } from 'src/components/game/templates/actions//details/ActionButton'
import { getAuthUsername } from 'src/helpers/auth'
import { canSeeTableActionsShowCards, getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsShowCards = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()

  const { handleShowCardAction } = useSocketActions(table.id)

  const authSeat = getUserSeat(table, username)

  if (!authSeat) return null

  if (!canSeeTableActionsShowCards(table, username)) return null

  return (
    <div className='popup-table-actions-showcards'>
      <div className='popup-table-actions-showcards-label'>Show Your Cards:</div>
      <div className='popup-table-actions-showcards-buttons'>
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
