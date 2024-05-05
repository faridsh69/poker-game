import { useEffect, useState } from 'react'

import {
  ANIMATION_CSS_USER_CARD_DELAY,
  ANIMATION_CSS_USER_CARD_DURATION,
  USER_CARDS_FOLD_CLASS_NAME,
  USER_CARDS_HIDE_CLASS_NAME,
  USER_CARDS_SHOW_CLASS_NAME,
  USER_CARD_CLASS_NAMES,
} from 'src/configs/clientConstantsPoker'
import { getNotSeatOutPlayers, getTurnInPassingCards, isPreflopPhase } from 'src/helpers/clientHelpersPoker'
import { playSound } from 'src/helpers/common'
import { TypeSeat, TypeTable } from 'src/interfaces'

export const useUserCardsAnimation = (table: TypeTable, seat: TypeSeat) => {
  const [cardClassNames, setCardClassNames] = useState<string[]>(USER_CARDS_SHOW_CLASS_NAME)

  const [lastUserCards, setLastUserCards] = useState<string>(JSON.stringify(seat.user.cards))

  // Pass card animation
  useEffect(() => {
    const cardsJson = JSON.stringify(seat.user.cards)
    setLastUserCards(cardsJson)

    if (!isPreflopPhase(table)) return
    if (lastUserCards === cardsJson) return

    const turnInPassingCards = getTurnInPassingCards(table, seat)
    const playersCount = getNotSeatOutPlayers(table).length

    setCardClassNames(USER_CARDS_HIDE_CLASS_NAME)
    for (let cardIndex = 0; cardIndex < seat.user.cards.length; cardIndex++) {
      // @ts-ignore
      const classAnimate = USER_CARD_CLASS_NAMES[`animatePass${cardIndex + 1}`]
      const animDelay =
        turnInPassingCards * ANIMATION_CSS_USER_CARD_DELAY + playersCount * ANIMATION_CSS_USER_CARD_DELAY * cardIndex

      // add animation
      setTimeout(() => {
        if (cardIndex === 0) playSound('card')
        setCardClassNames(classes => classes.map((cls, clsIndex) => (clsIndex === cardIndex ? classAnimate : cls)))
      }, animDelay)

      // show cards
      const showCardsDelay = animDelay + ANIMATION_CSS_USER_CARD_DURATION
      setTimeout(() => {
        setCardClassNames(classes => classes.map((cls, clsIndex) => (clsIndex === cardIndex ? '' : cls)))
      }, showCardsDelay)
    }
  }, [seat.user.cards])

  const [lastUserIsFold, setLastUserIsFold] = useState<boolean>(seat.user.isFold)

  // Fold animation
  useEffect(() => {
    setLastUserIsFold(seat.user.isFold)

    if (!seat.user.isFold) return
    if (lastUserIsFold === seat.user.isFold) return

    setCardClassNames(USER_CARDS_FOLD_CLASS_NAME)

    // hide cards
    setTimeout(() => {
      setCardClassNames(USER_CARDS_HIDE_CLASS_NAME)
    }, ANIMATION_CSS_USER_CARD_DURATION)
  }, [seat.user.isFold])

  return { cardClassNames }
}
