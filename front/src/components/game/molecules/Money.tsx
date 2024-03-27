import { Chips } from './Chips'

export const Money = (props: { money: number; showChips?: boolean }) => {
  const { money, showChips = false } = props

  const formattedMoney = money.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })

  return (
    <div className='cash'>
      {showChips && <Chips money={money} />}
      <div className='cash-money'>{formattedMoney}</div>
    </div>
  )
}
