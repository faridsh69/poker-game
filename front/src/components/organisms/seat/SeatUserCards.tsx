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
import {
  ANIMATION_CSS_DURATION,
  ANIMATION_PASS_CARD_SPEED,
  CARD_CLASS_NAMES,
} from 'src/configs/clientConstantsPoker'

export const SeatUserCards = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const { username } = useAuth()

  const [lastUserCards, setLastUserCards] = useState(JSON.stringify(seat.user.cards))
  const [lastUserIsFold, setLastUserIsFold] = useState(seat.user.isFold)

  const [cardClassNames, setCardClassNames] = useState([
    CARD_CLASS_NAMES.show,
    CARD_CLASS_NAMES.show,
  ])

  useEffect(() => {
    setLastUserIsFold(seat.user.isFold)

    if (lastUserIsFold === seat.user.isFold) return

    setCardClassNames([CARD_CLASS_NAMES.animateFold1, CARD_CLASS_NAMES.animateFold2])

    // hide cards

    setTimeout(() => {
      setCardClassNames(clses => {
        return clses.map(() => CARD_CLASS_NAMES.hide)
      })
    }, ANIMATION_CSS_DURATION)
  }, [seat.user.isFold])

  useEffect(() => {
    const cardsJson = JSON.stringify(seat.user.cards)
    setLastUserCards(cardsJson)

    if (lastUserCards === cardsJson) return

    const turnInPassingCards = getTurnInPassingCards(table, seat)
    const playersCount = getNotSeatOutPlayers(table).length

    for (let cardIndex = 0; cardIndex < seat.user.cards.length; cardIndex++) {
      // hide cards
      setCardClassNames(clses => {
        return clses.map(() => CARD_CLASS_NAMES.hide)
      })

      // add animation
      // @ts-ignore
      const classAnimate = CARD_CLASS_NAMES[`animatePass${cardIndex + 1}`]
      const animDelay =
        turnInPassingCards * ANIMATION_PASS_CARD_SPEED +
        playersCount * ANIMATION_PASS_CARD_SPEED * cardIndex

      setTimeout(() => {
        if (cardIndex === 0) playSound('card')
        setCardClassNames(classes =>
          classes.map((cls, clsIndex) => (clsIndex === cardIndex ? classAnimate : cls)),
        )
      }, animDelay)

      // show cards
      const finishedPassingCardsDelay =
        ANIMATION_PASS_CARD_SPEED * playersCount * 2 + ANIMATION_CSS_DURATION

      setTimeout(() => {
        setCardClassNames(clses => {
          return clses.map(() => CARD_CLASS_NAMES.show)
        })
      }, finishedPassingCardsDelay)
    }
  }, [seat.user.cards])

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        const backcard = showBackcard(seat, username, table, card)

        // if (backcard && isFoldSeat(seat)) return null
        // if (backcard) return null

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
