import { Chip } from './Chip'
import { useMemo } from 'react'

export const Chips = (props: { money: number }) => {
  const { money } = props

  const units = [
    {
      color: 'yellow',
      cent: 1,
    },
    {
      color: 'lightgreen',
      cent: 5,
    },
    {
      color: 'lightblue',
      cent: 25,
    },
    {
      color: 'lightblue',
      cent: 100,
    },
  ]

  const createArrayOfIntegers = (length: number): number[] => {
    return new Array(length).fill(0)
  }

  type ChipColumnProp = {
    count: number
    color: string
  }

  const chipColumns = useMemo(() => {
    const moneyInSent = money * 100
    const chipColumns: ChipColumnProp[] = []

    for (const unit of units) {
      const maximumCent = 5 * unit.cent
      const countCent = moneyInSent % maximumCent
      if (countCent) {
        chipColumns.push({ count: countCent, color: unit.color })
      }
    }

    return chipColumns
  }, [money])

  return (
    <div className='money-with-chips-chips'>
      {chipColumns.map(chipColumn => {
        return (
          <div>
            {createArrayOfIntegers(chipColumn.count).map(x => {
              return <Chip color={chipColumn.color} />
            })}
          </div>
        )
      })}
    </div>
  )
}
