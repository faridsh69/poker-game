import { useEffect, useState } from 'react'

import { Money } from 'src/components/game/molecules/Money/Money'
import { ANIMATION_CSS_WIN_POT_DURATION } from 'src/configs/clientConstantsPoker'
import {
  isAllinSeat,
  isSeatoutSeat,
  isWinnerSeat,
  isWithoutCardsSeat,
  roundNumber,
} from 'src/helpers/clientHelpersPoker'
import { TypeSeatAnTableProps } from 'src/interfaces'

export const SeatUserCash = (props: TypeSeatAnTableProps) => {
  const { seat, table } = props

  const bigBlind = table.blinds.big

  const [userCashInGame, setUserCashInGame] = useState(seat.user.cash.inGame)

  useEffect(() => {
    const cashInGame = seat.user.cash.inGame
    if (isWinnerSeat(seat)) {
      setTimeout(() => {
        setUserCashInGame(cashInGame)
      }, ANIMATION_CSS_WIN_POT_DURATION)
    } else {
      setUserCashInGame(cashInGame)
    }
  }, [seat.user.cash.inGame, table.phase])

  if (isSeatoutSeat(seat)) {
    return (
      <div className='dnd-window-body-table-seats-seat-user-cash'>
        <span className='sitting-out'>Sitting Out</span>
      </div>
    )
  }

  if (isAllinSeat(seat) && !isWithoutCardsSeat(seat)) {
    return (
      <div className='dnd-window-body-table-seats-seat-user-cash '>
        <span className='all-in'>All-In</span>
      </div>
    )
  }

  return (
    <div
      className='dnd-window-body-table-seats-seat-user-cash'
      title={roundNumber(userCashInGame / bigBlind, 2) + ' BB'}
    >
      <Money money={userCashInGame} />
    </div>
  )
}
