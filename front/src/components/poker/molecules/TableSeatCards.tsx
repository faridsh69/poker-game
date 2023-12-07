import { TypeCard } from 'src/interfaces/type-game'

export const TableSeatCards = (props: { cards: TypeCard[] }) => {
  const { cards } = props

  return (
    <div className='seat-user-cards'>
      {cards.map(card => {
        return (
          <div className='seat-user-cards-card' key={card.type + card.number}>
            <div className='seat-user-cards-card-number'>{card.number}</div>
            <img src={`/${card.type}.png`} alt={card.type} className='seat-user-cards-card-type' />
          </div>
        )
      })}
    </div>
  )
}
