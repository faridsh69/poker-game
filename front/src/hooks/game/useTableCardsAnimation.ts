import { useCallback, useEffect, useState } from 'react'

import { useAtom } from 'jotai'

import {
  ANIMATION_CSS_TABLE_CARD_DURATION,
  TABLE_CARD_FLOP_CLASS_NAMES,
  TABLE_CARD_HIDE_CLASS_NAMES,
  TABLE_CARD_PRE_FLOP_CLASS_NAMES,
  TABLE_CARD_PRE_RIVER_CLASS_NAMES,
  TABLE_CARD_PRE_TURN_CLASS_NAMES,
  TABLE_CARD_RIVER_CLASS_NAMES,
  TABLE_CARD_SHOW_CLASS_NAMES,
  TABLE_CARD_TURN_CLASS_NAMES,
  TABLE_PHASES,
} from 'src/configs/clientConstantsPoker'
import { finishedAllCardsAnimationAtom } from 'src/contexts/finishedAllCardsAnimationAtom'
import { getTableCardsLength } from 'src/helpers/clientHelpersPoker'
import { TypeTablePhase } from 'src/interfaces'

export const useTableCardsAnimation = (tablePhase: TypeTablePhase) => {
  const [tableCardLength, setTableCardLength] = useState(getTableCardsLength(tablePhase))

  const [cardClassNames, setCardClassNames] = useState<string[]>(TABLE_CARD_HIDE_CLASS_NAMES)
  const [, setFinishedAllCardsAnimation] = useAtom(finishedAllCardsAnimationAtom)

  const handleFinishedAllCardsAnimation = useCallback((delay: number = ANIMATION_CSS_TABLE_CARD_DURATION) => {
    setTimeout(() => {
      setFinishedAllCardsAnimation(true)
      setCardClassNames(TABLE_CARD_SHOW_CLASS_NAMES)
    }, delay)
  }, [])

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
        if (tablePhase === TABLE_PHASES.river) {
          setCardClassNames(TABLE_CARD_RIVER_CLASS_NAMES)
          handleFinishedAllCardsAnimation(ANIMATION_CSS_TABLE_CARD_DURATION)
        } else {
          setCardClassNames(TABLE_CARD_PRE_RIVER_CLASS_NAMES)

          setTimeout(() => {
            setCardClassNames(TABLE_CARD_RIVER_CLASS_NAMES)
            handleFinishedAllCardsAnimation(2 * ANIMATION_CSS_TABLE_CARD_DURATION)
          }, 4 * ANIMATION_CSS_TABLE_CARD_DURATION)
        }
      }

      if (tableCardLength === 3) {
        setCardClassNames(TABLE_CARD_PRE_TURN_CLASS_NAMES)

        setTimeout(() => {
          setCardClassNames(TABLE_CARD_TURN_CLASS_NAMES)
        }, 4 * ANIMATION_CSS_TABLE_CARD_DURATION)

        setTimeout(() => {
          setCardClassNames(TABLE_CARD_RIVER_CLASS_NAMES)
          handleFinishedAllCardsAnimation(2 * ANIMATION_CSS_TABLE_CARD_DURATION)
        }, 8 * ANIMATION_CSS_TABLE_CARD_DURATION)
      }

      if (tableCardLength === 0) {
        setCardClassNames(TABLE_CARD_PRE_FLOP_CLASS_NAMES)

        setTimeout(() => {
          setCardClassNames(TABLE_CARD_FLOP_CLASS_NAMES)
        }, 4 * ANIMATION_CSS_TABLE_CARD_DURATION)

        setTimeout(() => {
          setCardClassNames(TABLE_CARD_TURN_CLASS_NAMES)
        }, 8 * ANIMATION_CSS_TABLE_CARD_DURATION)

        setTimeout(() => {
          setCardClassNames(TABLE_CARD_RIVER_CLASS_NAMES)
          handleFinishedAllCardsAnimation(2 * ANIMATION_CSS_TABLE_CARD_DURATION)
        }, 12 * ANIMATION_CSS_TABLE_CARD_DURATION)
      }
    }
  }, [tablePhase])

  return { cardClassNames, tableCardLength }
}
