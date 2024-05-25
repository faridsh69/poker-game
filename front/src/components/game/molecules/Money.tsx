import { useMemo } from 'react'

import { useAtom } from 'jotai'

import { Chips } from 'src/components/game/molecules/Chips'
import { MONEY_UNITS } from 'src/configs/moneyUnits'
import { moneyUnitTitleAtom } from 'src/contexts/moneyUnitTitleAtom'
import { useCrudExchange } from 'src/services/hooks/useCrudExchange'

export const Money = (props: { money: number; showChips?: boolean }) => {
  const { money, showChips = false } = props

  const [moneyUnitTitle] = useAtom(moneyUnitTitleAtom)
  const exchangeList = useCrudExchange()

  const formattedMoney = useMemo(() => {
    const unit = MONEY_UNITS.find(u => u.title === moneyUnitTitle) || MONEY_UNITS[0]
    const exchangeRate = exchangeList[unit.apiKey] || 1

    const convertedMoney = money * exchangeRate * 100

    return convertedMoney.toLocaleString(unit.country, {
      style: 'currency',
      currency: unit.title,
      maximumFractionDigits: unit.digits,
    })
  }, [money, exchangeList, moneyUnitTitle])

  return (
    <div className='cash'>
      {showChips && <Chips money={money} />}
      <div className='cash-money'>{formattedMoney}</div>
    </div>
  )
}
