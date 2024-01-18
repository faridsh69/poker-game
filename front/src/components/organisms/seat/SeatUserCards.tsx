import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { TypeSeatAndShowPhaseProps } from 'src/interfaces'
import { GameCard } from 'src/components/organisms/cards/GameCard'
import { showBackcard } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'

export const SeatUserCards = (props: TypeSeatAndShowPhaseProps) => {
  const { seat, isShowPhase } = props

  const { username } = useAuth()

  const backcard = showBackcard(seat, username, isShowPhase)

  const [cardSound] = useState(new Audio('/sounds/card.mp3'))

  // 1) aval dealer o peida mikonim, badesh nafare badi bayad 1 bashe badi 2 ...
  // 2) bad be oni ke 1 hast bade 200ms cart 1 esh az hiddeni dar miad
  // 3) 1200 ms ham karte 2 sh az hiddeni dar miad
  // 4) class hae animationi ham hamegi from tto daran, yek fasele zamani

  const cardClasses = {
    hide: 'card-hide',
    show: 'card-show',
    animate1: 'card-pass-1',
    animate2: 'card-pass-2',
  }

  const [cardClassNames, setCardClassNames] = useState({
    0: cardClasses.hide,
    1: cardClasses.hide,
  })

  useEffect(() => {
    if (!seat.user.cards.length) return

    const timeouts: ReturnType<typeof setTimeout>[] = []
    for (const cardIndex of [0, 1]) {
      timeouts.push(
        setTimeout(
          () => {
            if (cardIndex === 0) {
              cardSound.play()
            }
            setCardClassNames(prev => ({
              ...prev,
              [cardIndex]: cardIndex ? cardClasses.animate2 : cardClasses.animate1,
            }))
          },
          seat.id * 100 + 800 * cardIndex,
        ),
      )

      timeouts.push(
        setTimeout(() => {
          setCardClassNames(prev => ({
            ...prev,
            [cardIndex]: cardClasses.show,
          }))
        }, 5000),
      )
    }

    return () => {
      for (const timeout of timeouts) {
        clearTimeout(timeout)
      }
    }
  }, [seat.user.cards.length])

  return (
    <div className='dnd-window-body-table-seats-seat-user-cards'>
      {seat.user.cards.map((card, cardIndex) => {
        return (
          <GameCard
            key={card.type + card.number}
            card={card}
            cardIndex={cardIndex}
            backcard={backcard}
            // @ts-ignore
            className={classNames(`${cardClassNames[cardIndex]}`)}
          />
        )
      })}
    </div>
  )
}
