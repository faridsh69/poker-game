import { useEffect, useState } from 'react'

import {
  ANIMATION_CSS_TABLE_CARD_DURATION,
  TABLE_CARD_FLOP_CLASS_NAMES,
  TABLE_CARD_RIVER_CLASS_NAMES,
  TABLE_CARD_TURN_CLASS_NAMES,
  TABLE_PHASES,
} from 'src/configs/clientConstantsPoker'
import { getTableCardsLength } from 'src/helpers/clientHelpersPoker'
import { TypeTablePhase } from 'src/interfaces'

export const useTableCardsAnimation = (tablePhase: TypeTablePhase) => {
  const [tableCardLength, setTableCardLength] = useState(getTableCardsLength(tablePhase))

  const [cardClassNames, setCardClassNames] = useState<string[]>([])

  useEffect(() => {
    if (tablePhase === TABLE_PHASES.finish) return

    const newTableCardsLength = getTableCardsLength(tablePhase)
    setTableCardLength(newTableCardsLength)

    if (tableCardLength === newTableCardsLength) return

    if (newTableCardsLength === 3) {
      setCardClassNames(TABLE_CARD_FLOP_CLASS_NAMES)
    }

    if (newTableCardsLength === 4) {
      setCardClassNames(TABLE_CARD_TURN_CLASS_NAMES)
    }

    if (newTableCardsLength === 5) {
      if (tableCardLength === 4) {
        setCardClassNames(TABLE_CARD_RIVER_CLASS_NAMES)
      }

      if (tableCardLength === 3) {
        setCardClassNames(TABLE_CARD_TURN_CLASS_NAMES)
        setTimeout(() => {
          setCardClassNames(TABLE_CARD_RIVER_CLASS_NAMES)
        }, ANIMATION_CSS_TABLE_CARD_DURATION)
      }

      if (tableCardLength === 0) {
        setCardClassNames(TABLE_CARD_FLOP_CLASS_NAMES)

        setTimeout(() => {
          setCardClassNames(TABLE_CARD_TURN_CLASS_NAMES)
        }, ANIMATION_CSS_TABLE_CARD_DURATION)

        setTimeout(() => {
          setCardClassNames(TABLE_CARD_RIVER_CLASS_NAMES)
        }, ANIMATION_CSS_TABLE_CARD_DURATION * 2)
      }
    }

    setTimeout(() => {
      setCardClassNames([])
    }, 3 * ANIMATION_CSS_TABLE_CARD_DURATION)
  }, [tablePhase])

  return { cardClassNames, tableCardLength }
}
