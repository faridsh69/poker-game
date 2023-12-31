import { useEffect, useState } from 'react'

import { TypeSeatAndShowPhaseProps } from 'src/interfaces'
import { GameCard } from 'src/components/organisms/cards/GameCard'
import { isAuthSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import classNames from 'classnames'

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

  useEffect(() => {
    if (!seat.user.cards.length) {
      setCard1IsHidden(true)
      setCard2IsHidden(true)
      return
    }

    setTimeout(() => {
      setCard1IsHidden(false)
    }, seat.id * 250)

    setTimeout(
      () => {
        setCard2IsHidden(false)
      },
      seat.id * 250 + 1000,
    )
  }, [seat.user.cards, seat.id])

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
