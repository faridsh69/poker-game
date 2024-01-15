import { Chip } from './Chip'
import { useMemo } from 'react'

type ChipColumnProp = {
  count: number
  backgroundPosition: string
}

export const Chips = (props: { money: number }) => {
  const { money } = props

  const units = [
    {
      backgroundPosition: '-283px 0px',
      value: 5000000,
      maximum: 25000000,
    },
    {
      backgroundPosition: '-259px 0px',
      value: 1000000,
      maximum: 5000000,
    },
    {
      backgroundPosition: '-235px 0px',
      value: 250000,
      maximum: 1000000,
    },
    {
      backgroundPosition: '-211px 0px',
      value: 50000,
      maximum: 250000,
    },
    {
      backgroundPosition: '-187px 0px',
      value: 10000,
      maximum: 50000,
    },
    {
      backgroundPosition: '-161px 0px',
      value: 2500,
      maximum: 10000,
    },
    {
      backgroundPosition: '-139px 0px',
      value: 500,
      maximum: 2500,
    },
    {
      backgroundPosition: '-115px 0px',
      value: 100,
      maximum: 500,
    },
    {
      backgroundPosition: '-91px 0px',
      value: 25,
      maximum: 100,
    },
    {
      backgroundPosition: '-67px 0px',
      value: 5,
      maximum: 25,
    },
    {
      backgroundPosition: '-43px 0px',
      value: 1,
      maximum: 5,
    },
  ]

  const createArrayOfIntegers = (length: number): number[] => {
    return new Array(length).fill(0)
  }

  const chipColumns = useMemo(() => {
    let remainingChips = money * 100
    const chipColumns: ChipColumnProp[] = []

    74
    for (const unit of units) {
      const countCent = Math.floor(remainingChips / unit.maximum)
      remainingChips = remainingChips % unit.maximum

      if (countCent) {
        chipColumns.push({ count: countCent, backgroundPosition: unit.backgroundPosition })
      }
    }

    return chipColumns
  }, [money])

  return (
    <div className='cash-chips'>
      {chipColumns.map(chipColumn => {
        return (
          <div className='cash-chips-column'>
            {createArrayOfIntegers(chipColumn.count).map((_, chipIndex) => {
              return (
                <Chip backgroundPosition={chipColumn.backgroundPosition} chipIndex={chipIndex} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
