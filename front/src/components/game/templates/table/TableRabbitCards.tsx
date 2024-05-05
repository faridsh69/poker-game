import { GameCard } from 'src/components/game/molecules/cards/GameCard'
import { isShowOrFinishPhase } from 'src/helpers/clientHelpersPoker'
import { TypeTableProps } from 'src/interfaces'

export const TableRabbitCards = (props: TypeTableProps) => {
  const { table } = props

  if (!isShowOrFinishPhase(table)) return null

  return (
    <div className='dnd-window-body-table-cards'>
      {table.cards.map(card => {
        return <GameCard card={card} backcard={false} key={card.type + card.number} isRabbitcard={true} />
      })}
    </div>
  )
}
