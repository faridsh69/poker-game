import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { GameCard } from 'src/components/organisms/cards/GameCard'
import {
  getNotSeatOutPlayers,
  getTurnInPassingCards,
  isPreflopPhase,
  showBackcard,
} from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { playSound } from 'src/helpers/common'
import { TypeSeatProps, TypeTable } from 'src/interfaces'
import {
  ANIMATION_CSS_DURATION,
  ANIMATION_PASS_CARD_DELAY,
  CARDS_FOLD_CLASS_NAME,
  CARDS_HIDE_CLASS_NAME,
  CARDS_SHOW_CLASS_NAME,
  CARD_CLASS_NAMES,
} from 'src/configs/clientConstantsPoker'

export const SeatUserCards = (props: TypeSeatProps & { table: TypeTable }) => {
  const { seat, table } = props

  const { username } = useAuth()

  const [cardClassNames, setCardClassNames] = useState<string[]>(CARDS_SHOW_CLASS_NAME)

  const [lastUserIsFold, setLastUserIsFold] = useState<boolean>(seat.user.isFold)

  // Fold animation
  useEffect(() => {
    setLastUserIsFold(seat.user.isFold)

    if (lastUserIsFold === seat.user.isFold) return

    setCardClassNames(CARDS_FOLD_CLASS_NAME)

    // hide cards
    setTimeout(() => {
      setCardClassNames(CARDS_HIDE_CLASS_NAME)
    }, ANIMATION_CSS_DURATION)
  }, [seat.user.isFold])

  const [lastUserCards, setLastUserCards] = useState<string>(JSON.stringify(seat.user.cards))

  // Pass card animation
  useEffect(() => {
    const cardsJson = JSON.stringify(seat.user.cards)
    setLastUserCards(cardsJson)

    if (!isPreflopPhase(table)) return
    if (lastUserCards === cardsJson) return

    const turnInPassingCards = getTurnInPassingCards(table, seat)
    const playersCount = getNotSeatOutPlayers(table).length

    setCardClassNames(CARDS_HIDE_CLASS_NAME)
    for (let cardIndex = 0; cardIndex < seat.user.cards.length; cardIndex++) {
      // @ts-ignore
      const classAnimate = CARD_CLASS_NAMES[`animatePass${cardIndex + 1}`]
      const animDelay =
        turnInPassingCards * ANIMATION_PASS_CARD_DELAY +
        playersCount * ANIMATION_PASS_CARD_DELAY * cardIndex

      // add animation
      setTimeout(() => {
        if (cardIndex === 0) playSound('card')
        setCardClassNames(classes =>
          classes.map((cls, clsIndex) => (clsIndex === cardIndex ? classAnimate : cls)),
        )
      }, animDelay)

      // show cards
      setTimeout(() => {
        setCardClassNames(classes =>
          classes.map((cls, clsIndex) => (clsIndex === cardIndex ? CARD_CLASS_NAMES.show : cls)),
        )
      }, animDelay + ANIMATION_CSS_DURATION)
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
