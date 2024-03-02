import { useEffect } from 'react'
import { useAtom } from 'jotai'
import classNames from 'classnames'

import { SignClubs } from './signs/SignClubs'
import { SignDiamonds } from './signs/SignDiamonds'
import { SignSpades } from './signs/SignSpades'
import { SignHearts } from './signs/SignHearts'
import { TypeGameCardProps } from 'src/interfaces'
import BackCardImage from 'src/components/organisms/cards/back/back4.svg'
import BackRabbitCardImage from 'src/components/organisms/cards/back/back-rabbit.svg'
import { CARD_TYPES } from 'src/configs/clientConstantsPoker'
import { rabbitCardHoveredAtom } from 'src/contexts/rabbitCardHoveredAtom'

export const GameCard = (props: TypeGameCardProps) => {
  const { card, cardIndex = -1, className = '', backcard = false, rabbitcard = false } = props

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

  const [rabbitCardHovered, setRabbitCardHovered] = useAtom(rabbitCardHoveredAtom)

  useEffect(() => {
    setRabbitCardHovered(false)
  }, [])

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
      {rabbitcard && (
        <div
          onMouseOver={() => setRabbitCardHovered(true)}
          className={classNames(
            'card-game-rabbitcard',
            rabbitCardHovered && 'card-game-rabbitcardhovered',
          )}
        >
          <img src={BackRabbitCardImage} alt='rabit card' />
        </div>
      )}
    </div>
  )
}
