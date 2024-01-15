import { Chips } from './Chips'

export const Money = (props: { money: number; withChips?: boolean }) => {
  const { money, withChips = true } = props

  const formattedMoney = money.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })

  return (
    <span className='money-with-chips'>
      <div className='money-with-chips-chips'>{withChips && <Chips money={money} />}</div>
      <div className='money-with-chips-money'>{formattedMoney}</div>
    </span>
  )
}
