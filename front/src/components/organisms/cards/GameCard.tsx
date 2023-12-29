import classNames from 'classnames'

import { SignClubs } from './signs/SignClubs'
import { SignDiamonds } from './signs/SignDiamonds'
import { SignSpades } from './signs/SignSpades'
import { SignHearts } from './signs/SignHearts'
import { TypeCard } from 'src/interfaces'

export const GameCard = (props: { card: TypeCard; className: string }) => {
  const { card, className } = props

  const cardSignComponent =
    card.type === 'clubs' ? (
      <SignClubs />
    ) : card.type === 'diamonds' ? (
      <SignDiamonds />
    ) : card.type === 'spades' ? (
      <SignSpades />
    ) : (
      <SignHearts />
    )

  return (
    <div className={classNames('gamecard', className)} key={card.type + card.number}>
      <div
        className='gamecard-number'
        style={{
          color: card.type === 'diamonds' || card.type === 'hearts' ? '#CB1515' : '#000',
        }}
      >
        {card.number}
      </div>
      <div className='gamecard-smallsign'>{cardSignComponent}</div>
      <div className='gamecard-bigsign'>{cardSignComponent}</div>
    </div>
  )
}
