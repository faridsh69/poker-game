import { Chips } from './Chips'
import { useAtom } from 'jotai'

import { moneyUnitAtom } from 'src/contexts/moneyUnitAtom'

export const Money = (props: { money: number; showChips?: boolean }) => {
  const { money, showChips = false } = props

  const [moneyUnit] = useAtom(moneyUnitAtom)

  const formattedMoney = money.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })

  return (
    <div className='cash'>
      {showChips && <Chips money={money} />}
      <div className='cash-money'>{moneyUnit === 'dollar' ? formattedMoney : `${money}t`}</div>
    </div>
  )
}
