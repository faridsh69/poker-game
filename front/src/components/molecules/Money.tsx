export const Money = (props: { money: number }) => {
  const { money } = props

  const formattedMoney = money.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })

  return <span className='money'>{formattedMoney}</span>
}
