import { TypeTableProps } from 'src/interfaces'
import { GameCard } from '../cards/GameCard'

export const TableRabbitCards = (props: TypeTableProps) => {
  const { table } = props

  return (
    <div className='dnd-window-body-table-cards'>
      {table.cards.map(card => {
        return <GameCard card={card} backcard={false} key={card.type + card.number} rabbitcard />
      })}
    </div>
  )
}
