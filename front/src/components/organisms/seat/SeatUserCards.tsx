import { useEffect, useState } from 'react'
import classNames from 'classnames'
import useSound from 'use-sound'

import passCardSound from 'src/images/game/sounds/pass-card1.mp3'
import { TypeSeatAndShowPhaseProps } from 'src/interfaces'
import { GameCard } from 'src/components/organisms/cards/GameCard'
import { isAuthSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'

export const SeatUserCards = (props: TypeSeatAndShowPhaseProps) => {
  const { seat, isShowPhase } = props

  const { username } = useAuth()

  const backcard = !isAuthSeat(seat, username) && !!seat.user.cards.length && !isShowPhase

  const [card1IsHidden, setCard1IsHidden] = useState(true)
  const [card2IsHidden, setCard2IsHidden] = useState(true)

  // 1) aval dealer o peida mikonim, badesh nafare badi bayad 1 bashe badi 2 ...
  // 2) bad be oni ke 1 hast bade 200ms cart 1 esh az hiddeni dar miad
  // 3) 1200 ms ham karte 2 sh az hiddeni dar miad
  // 4) class hae animationi ham hamegi from tto daran, yek fasele zamani

  const [play] = useSound(passCardSound)

  useEffect(() => {
    if (!seat.user.cards.length) {
      setCard1IsHidden(true)
      setCard2IsHidden(true)
      return
    }

    if (!card1IsHidden || !card2IsHidden || !play) return

    const card1Timeout = setTimeout(() => {
      setCard1IsHidden(false)
      play()
    }, seat.id * 500)

    const card2Timeout = setTimeout(
      () => {
        setCard2IsHidden(false)
        play()
      },
      seat.id * 500 + 750,
    )

    return () => {
      clearTimeout(card1Timeout)
      clearTimeout(card2Timeout)
    }
  }, [seat.user.cards.length, seat.id, play])

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        if (card1IsHidden && cardIndex === 0) return null
        if (card2IsHidden && cardIndex === 1) return null

        return (
          <GameCard
            key={card.type + card.number}
            card={card}
            className={classNames(
              `card-${cardIndex + 1}`,
              !card1IsHidden && cardIndex === 0 && `animation-pass-card-1`,
              !card2IsHidden && cardIndex === 1 && `animation-pass-card-2`,
            )}
            backcard={backcard}
          />
        )
      })}
    </div>
  )
}
