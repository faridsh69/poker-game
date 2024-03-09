import { ChipColumnProp } from 'src/interfaces'
import { Chip } from './Chip'
import { useMemo } from 'react'
import { CHIP_UNITS } from 'src/configs/clientConstantsPoker'

export const Chips = (props: { money: number }) => {
  const { money } = props

  const createArrayOfIntegers = (length: number): number[] => {
    return new Array(length).fill(0)
  }

  const chipColumns = useMemo(() => {
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
        console.log('#1 bug count mines:  money', money, countCent, unit)
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
