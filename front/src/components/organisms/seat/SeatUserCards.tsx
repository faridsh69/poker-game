import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import { GameCard } from 'src/components/organisms/cards/GameCard'
import {
  getNotSeatOutPlayers,
  getTurnInPassingCards,
  isFoldSeat,
  showBackcard,
} from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { playSound } from 'src/helpers/common'
import { TypeSeatProps, TypeTable } from 'src/interfaces'
import { ANIMATION_PASS_CARD_SPEED } from 'src/configs/clientConstantsPoker'

const CARD_CLASSES = {
  hide: 'card-hide',
  show: 'card-show',
  animate1: 'card-pass-1',
  animate2: 'card-pass-2',
}

export const SeatUserCards = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const { username } = useAuth()

  const [lastUserCards, setLastUserCards] = useState(JSON.stringify(seat.user.cards))
  const [cardClassNames, setCardClassNames] = useState([CARD_CLASSES.show, CARD_CLASSES.show])

  useEffect(() => {
    const cardsJson = JSON.stringify(seat.user.cards)
    setLastUserCards(cardsJson)

    if (lastUserCards === cardsJson) return

    const turnInPassingCards = getTurnInPassingCards(table, seat)
    const playersCount = getNotSeatOutPlayers(table).length

    for (let cardIndex = 0; cardIndex < seat.user.cards.length; cardIndex++) {
      // @ts-ignore
      const classAnimate = CARD_CLASSES[`animate${cardIndex + 1}`]
      setCardClassNames(clses => {
        return clses.map(cls => CARD_CLASSES.hide)
      })

      const animDelay =
        turnInPassingCards * ANIMATION_PASS_CARD_SPEED +
        playersCount * ANIMATION_PASS_CARD_SPEED * cardIndex

      setTimeout(() => {
        if (cardIndex === 0) playSound('card')
        setCardClassNames(classes =>
          classes.map((cls, clsIndex) => (clsIndex === cardIndex ? classAnimate : cls)),
        )
      }, animDelay)
    }
  }, [seat.user.cards])

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        const backcard = showBackcard(seat, username, table, card)

        if (backcard && isFoldSeat(seat)) return null

        return (
          <GameCard
            key={card.type + card.number}
            card={card}
            cardIndex={cardIndex}
            backcard={backcard}
            className={classNames(`${cardClassNames[cardIndex]}`)}
          />
        )
      })}
    </div>
  )
}
