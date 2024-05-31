import { useEffect, useState } from 'react'

import { ANIMATION_CSS_WIN_POT_DELAY, SEAT_POT_ID_PREF, TABLE_POT_ID_PREF } from 'src/configs/clientConstantsPoker'
import { getCoordinatesDiff, getElCoordinatesById } from 'src/helpers/common'

export const useWinPotAnimation = (winnerSeatId: number, tablePotId: number) => {
  const [coordinates, setCoordinates] = useState({ left: 0, top: 0 })

  useEffect(() => {
    const destinationCoordinates = getElCoordinatesById(`${SEAT_POT_ID_PREF}${winnerSeatId}`)
    const sourceCoordinates = getElCoordinatesById(`${TABLE_POT_ID_PREF}${tablePotId}`)
    const diffCoordinates = getCoordinatesDiff(sourceCoordinates, destinationCoordinates)

    if (!destinationCoordinates || !sourceCoordinates) return

    setTimeout(() => {
      setCoordinates(diffCoordinates)
    }, ANIMATION_CSS_WIN_POT_DELAY)
  }, [winnerSeatId])

  return coordinates
}
