import { useMemo } from 'react'

import { useAtom } from 'jotai'

import { Chips } from 'src/components/game/molecules/Money/Chips'
import { moneyUnitTitleAtom } from 'src/contexts/moneyUnitTitleAtom'
import { formatMoney } from 'src/helpers/common'
import { useCrudExchange } from 'src/services/hooks/useCrudExchange'

type TypeProps = { money: number; showChips?: boolean; brif?: boolean }

export const Money = (props: TypeProps) => {
  const { money, showChips = false, brif = false } = props

  const [moneyUnitTitle] = useAtom(moneyUnitTitleAtom)
  const exchangeList = useCrudExchange()

  const formattedMoney = useMemo(() => {
    if (money <= 0) return '0'

    return formatMoney(money, moneyUnitTitle, exchangeList, brif)
  }, [money, exchangeList, moneyUnitTitle, brif])

  return (
    <div className='cash'>
      {showChips && <Chips money={money} />}
      <div className='cash-money'>{formattedMoney}</div>
    </div>
  )
}
