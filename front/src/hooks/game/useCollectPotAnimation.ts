import { useEffect, useState } from 'react'

import { SEAT_POT_ID_PREF, TABLE_POT_ID_PREF } from 'src/configs/clientConstantsPoker'
import { getCoordinatesDiff, getElCoordinatesById } from 'src/helpers/common'

export const useCollectPotAnimation = (userPotSeatId: number, tablePotId: number) => {
  const sourceCoordinates = getElCoordinatesById(`${SEAT_POT_ID_PREF}${userPotSeatId}`)
  const destinationCoordinates = getElCoordinatesById(`${TABLE_POT_ID_PREF}${tablePotId}`)
  const diffCoordinates = getCoordinatesDiff(destinationCoordinates, sourceCoordinates)

  const [coordinates, setCoordinates] = useState(diffCoordinates)

  useEffect(() => {
    setCoordinates({ left: 0, top: 0 })
  }, [])

  return coordinates
}
