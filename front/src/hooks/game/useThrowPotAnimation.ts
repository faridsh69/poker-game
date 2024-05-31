import { useEffect, useState } from 'react'

import { SEAT_ID_PREF, SEAT_POT_ID_PREF, TRANSITION_CSS_THROW_POT_DURATION } from 'src/configs/clientConstantsPoker'
import { getCoordinatesDiff, getElCoordinatesById } from 'src/helpers/common'

export const useThrowPotAnimation = (seatId: number, inPot: number, lastUserPot: number) => {
  const [restOfUserPotAnimation, setRestOfUserPotAnimation] = useState(0)

  const [coordinates, setCoordinates] = useState({})

  const resetPotPosition = () => {
    const sourceCoordinates = getElCoordinatesById(`${SEAT_ID_PREF}${seatId}`)
    const destinationCoordinates = getElCoordinatesById(`${SEAT_POT_ID_PREF}${seatId}`)
    const diffCoordinates = getCoordinatesDiff(destinationCoordinates, sourceCoordinates)

    setCoordinates({ left: diffCoordinates.left + 40, top: diffCoordinates.top + 70 })
  }

  useEffect(() => {
    resetPotPosition()
  }, [])

  useEffect(() => {
    if (restOfUserPotAnimation) return

    resetPotPosition()
  }, [restOfUserPotAnimation])

  useEffect(() => {
    if (inPot < lastUserPot) return

    setRestOfUserPotAnimation(inPot - lastUserPot)

    if (lastUserPot === inPot) {
      resetPotPosition()
      return
    }

    setCoordinates({ left: 0, top: 0 })
    setTimeout(() => {
      setRestOfUserPotAnimation(0)
    }, TRANSITION_CSS_THROW_POT_DURATION)
  }, [inPot])

  return { coordinates, restOfUserPotAnimation }
}
