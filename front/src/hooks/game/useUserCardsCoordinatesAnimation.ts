import { useEffect, useMemo, useState } from 'react'

import {
  ANIMATION_CSS_USER_CARD_DELAY,
  SEAT_ID_PREF,
  TABLE_CENTER_ID_PREF,
  USER_CARDS_SHOW_STYLE,
} from 'src/configs/clientConstantsPoker'
import { getNotSeatOutPlayers, getTurnInPassingCards, isPreflopPhase } from 'src/helpers/clientHelpersPoker'
import { getDiffCordinateElements, playSound } from 'src/helpers/common'
import { TypeSeat, TypeTable } from 'src/interfaces'

export const useUserCardsCoordinatesAnimation = (table: TypeTable, seat: TypeSeat) => {
  const [styles, setStyles] = useState([USER_CARDS_SHOW_STYLE, USER_CARDS_SHOW_STYLE])

  const [lastUserCards, setLastUserCards] = useState<string>(JSON.stringify(seat.user.cards))

  const diffCordinates = useMemo(() => {
    return getDiffCordinateElements(`${TABLE_CENTER_ID_PREF}`, `${SEAT_ID_PREF}${seat.id}`)
  }, [seat])

  // Pass card animation
  useEffect(() => {
    const cardsJson = JSON.stringify(seat.user.cards)
    setLastUserCards(cardsJson)

    if (!isPreflopPhase(table)) return
    if (lastUserCards === cardsJson) return

    const turnInPassingCards = getTurnInPassingCards(table, seat)
    const playersCount = getNotSeatOutPlayers(table).length

    setStyles(styles =>
      styles.map(() => ({ left: diffCordinates.left, top: diffCordinates.top, opacity: 0, visibility: 'hidden' })),
    )

    for (let cardIndex = 0; cardIndex < seat.user.cards.length; cardIndex++) {
      const animDelay =
        turnInPassingCards * ANIMATION_CSS_USER_CARD_DELAY + playersCount * ANIMATION_CSS_USER_CARD_DELAY * cardIndex

      setTimeout(() => {
        if (cardIndex === 0) playSound('card')

        setStyles(prev => prev.map((st, cardInd) => (cardInd === cardIndex ? USER_CARDS_SHOW_STYLE : st)))
      }, animDelay)

      // // show cards
      // const showCardsDelay = animDelay + ANIMATION_CSS_USER_CARD_DURATION

      // setTimeout(() => {
      //   setStyles([USER_CARDS_SHOW_STYLE, USER_CARDS_SHOW_STYLE])
      // }, showCardsDelay)
    }
  }, [seat.user.cards])

  const [lastUserIsFold, setLastUserIsFold] = useState<boolean>(seat.user.isFold)

  // Fold animation
  useEffect(() => {
    setLastUserIsFold(seat.user.isFold)

    if (!seat.user.isFold) return
    if (lastUserIsFold === seat.user.isFold) return

    setStyles(styles =>
      styles.map(() => ({ left: diffCordinates.left, top: diffCordinates.top, opacity: 0, visibility: 'visible' })),
    )
    // // hide cards
    // setTimeout(() => {
    //   setCardClassNames(USER_CARDS_HIDE_CLASS_NAME)
    // }, ANIMATION_CSS_USER_CARD_DURATION)
  }, [seat.user.isFold])

  const finalStyles = useMemo(() => {
    return styles.map((st, cardInd) => {
      const diffLeft = cardInd === 0 ? -6 : 38
      const diffTop = 3

      return {
        left: st.left + diffLeft,
        top: st.top + diffTop,
        opacity: st.opacity,
        visibility: st.visibility,
      }
    })
  }, [styles])

  return finalStyles
}
