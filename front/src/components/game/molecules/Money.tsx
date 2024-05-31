import { useMemo } from 'react'

import { useAtom } from 'jotai'

import { Chips } from 'src/components/game/molecules/Chips'
import { moneyUnitTitleAtom } from 'src/contexts/moneyUnitTitleAtom'
import { formatMoney } from 'src/helpers/common'
import { useCrudExchange } from 'src/services/hooks/useCrudExchange'

export const Money = (props: { money: number; showChips?: boolean }) => {
  const { money, showChips = false } = props

  const [moneyUnitTitle] = useAtom(moneyUnitTitleAtom)
  const exchangeList = useCrudExchange()

  const formattedMoney = useMemo(() => {
    if (money < 0) return '0'

    return formatMoney(money, moneyUnitTitle, exchangeList)
  }, [money, exchangeList, moneyUnitTitle])

  return (
    <div className='cash'>
      {showChips && <Chips money={money} />}
      <div className='cash-money'>{formattedMoney}</div>
    </div>
  )
}
