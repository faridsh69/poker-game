import { TypeCard } from 'src/interfaces/type-game'

export const TableSeatCards = (props: { cards: TypeCard[]; isAuthSeat: boolean }) => {
  const { cards, isAuthSeat } = props

  // @TODO revert
  if (!isAuthSeat && cards.length) {
    return (
      <div className='seat-user-cards'>
        <div className='seat-user-cards-card hide-card'>
          <img src='/hide-card.png' alt='card' />
        </div>
        <div className='seat-user-cards-card hide-card'>
          <img src='/hide-card.png' alt='card' />
        </div>
      </div>
    )
  }

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
