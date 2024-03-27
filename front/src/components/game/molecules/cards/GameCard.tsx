import classNames from 'classnames'

import { SignClubs } from 'src/components/game/molecules/cards/signs/SignClubs'
import { SignDiamonds } from 'src/components/game/molecules/cards/signs/SignDiamonds'
import { SignSpades } from 'src/components/game/molecules/cards/signs/SignSpades'
import { SignHearts } from 'src/components/game/molecules/cards/signs/SignHearts'
import { TypeGameCardProps } from 'src/interfaces'
import BackCardImage from 'src/components/game/molecules/cards/back/back4.svg'
import { CARD_TYPES } from 'src/configs/clientConstantsPoker'
import { RabbitGameCard } from 'src/components/game/molecules/cards/RabbitGameCard'

export const GameCard = (props: TypeGameCardProps) => {
  const { card, cardIndex = -1, className = '', backcard = false, isRabbitcard = false } = props

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
      <RabbitGameCard isRabbitcard={isRabbitcard} />
    </div>
  )
}
