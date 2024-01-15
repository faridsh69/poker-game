import { Chip } from './Chip'
import { useMemo } from 'react'

type ChipColumnProp = {
  count: number
  color: string
}

export const Chips = (props: { money: number }) => {
  const { money } = props

  const units = [
    {
      color: '#99ff35',
      value: 5000000,
      maximum: 25000000,
    },
    {
      color: '#99ff34',
      value: 1000000,
      maximum: 5000000,
    },
    {
      color: '#99ff33',
      value: 250000,
      maximum: 1000000,
    },
    {
      color: '#ff9900',
      value: 50000,
      maximum: 250000,
    },
    {
      color: '#0099ff',
      value: 10000,
      maximum: 50000,
    },
    {
      color: '#A8A8A1',
      value: 2500,
      maximum: 10000,
    },
    {
      color: '#81C7FF',
      value: 500,
      maximum: 2500,
    },
    {
      color: '#8CB900',
      value: 100,
      maximum: 500,
    },
    {
      color: '#DCAB6B',
      value: 25,
      maximum: 100,
    },
    {
      color: '#111',
      value: 5,
      maximum: 25,
    },
    {
      color: '#111',
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

    for (const unit of units) {
      const countCent = Math.floor(remainingChips / unit.maximum)
      remainingChips = remainingChips % unit.maximum

      if (countCent) {
        chipColumns.push({ count: countCent, color: unit.color })
      }
    }

    return chipColumns
  }, [money])

  return (
    <div className='cash-chips'>
      {chipColumns.map(chipColumn => {
        return (
          <div className='cash-chips-column'>
            {createArrayOfIntegers(chipColumn.count).map(x => {
              return <Chip color={chipColumn.color} />
            })}
          </div>
        )
      })}
    </div>
  )
}
