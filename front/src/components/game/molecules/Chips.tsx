import { useMemo } from 'react'

import { Chip } from './Chip'

import { CHIP_UNITS } from 'src/configs/clientConstantsPoker'
import { isNumber } from 'src/helpers/common'
import { ChipColumnProp } from 'src/interfaces'

export const Chips = (props: { money: number }) => {
  const { money } = props

  const createArrayOfIntegers = (length: number): number[] => {
    if (!isNumber(length) || length < 0) return []

    return new Array(length).fill(0)
  }

  const chipColumns = useMemo(() => {
    if (money < 0) return []
    let remainingChips = money
    const chipColumns: ChipColumnProp[] = []

    for (const unit of CHIP_UNITS) {
      const countCent = Math.floor(remainingChips / unit.value)
      remainingChips = remainingChips % unit.value

      if (countCent) {
        chipColumns.push({
          value: unit.value,
          count: countCent,
          backgroundPosition: unit.backgroundPosition,
        })
      }
      if (countCent < 0) {
        console.warn('#1 bug count mines:  money', money, countCent, unit)
      }
    }

    return chipColumns
  }, [money])

  return (
    <div className='cash-chips'>
      {chipColumns.map((chipColumn, chipColumnIndex) => {
        if (chipColumnIndex > 2) return null

        return (
          <div className='cash-chips-column' key={chipColumn.value}>
            {createArrayOfIntegers(chipColumn.count).map((_, chipIndex) => {
              return (
                <Chip
                  value={chipColumn.value}
                  backgroundPosition={chipColumn.backgroundPosition}
                  chipIndex={chipIndex}
                  key={chipIndex}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
