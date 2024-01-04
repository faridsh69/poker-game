import classNames from 'classnames'

import { SignClubs } from './signs/SignClubs'
import { SignDiamonds } from './signs/SignDiamonds'
import { SignSpades } from './signs/SignSpades'
import { SignHearts } from './signs/SignHearts'
import { TypeGameCardProps } from 'src/interfaces'
import BackCardImage from 'src/components/organisms/cards/back/back4.svg'
import { CARD_TYPES } from 'src/configs/clientConstantsPoker'

export const GameCard = (props: TypeGameCardProps) => {
  const { card, cardIndex, className = '', backcard = false } = props

  const cardSignComponent =
    card.type === CARD_TYPES.clubs ? (
      <SignClubs />
    ) : card.type === CARD_TYPES.diamonds ? (
      <SignDiamonds />
    ) : card.type === CARD_TYPES.spades ? (
      <SignSpades />
    ) : (
      <SignHearts />
    )

  const cardIsRed =
    !backcard && (card.type === CARD_TYPES.diamonds || card.type === CARD_TYPES.hearts)

  const allClassNames = classNames(
    'card-game',
    backcard && 'card-back',
    cardIsRed && 'card-red',
    `card-${cardIndex + 1}`,
    className,
  )

  if (backcard) {
    return (
      <div className={allClassNames}>
        <img src={BackCardImage} alt='hidden card' />
      </div>
    )
  }

  return (
    <div className={allClassNames}>
      <div className='card-game-number'>{card.number}</div>
      <div className='card-game-smallsign'>{cardSignComponent}</div>
      <div className='card-game-bigsign'>{cardSignComponent}</div>
    </div>
  )
}
