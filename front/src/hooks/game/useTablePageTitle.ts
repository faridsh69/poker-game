import { useEffect } from 'react'

import { useAtom } from 'jotai'

import { moneyUnitTitleAtom } from 'src/contexts/moneyUnitTitleAtom'
import { pageTitleAtom } from 'src/contexts/pageTitleAtom'
import { formatMoney } from 'src/helpers/common'
import { TypeTable } from 'src/interfaces'

export const useTablePageTitle = (table: TypeTable) => {
  const [, setTitle] = useAtom(pageTitleAtom)
  const [moneyUnitTitle] = useAtom(moneyUnitTitleAtom)

  useEffect(() => {
    const small = formatMoney(table.blinds.small, moneyUnitTitle, {}, true)
    const big = formatMoney(table.blinds.big, moneyUnitTitle, {}, true)
    const min = formatMoney(table.buyin.min, moneyUnitTitle, {}, true)
    const max = formatMoney(table.buyin.max, moneyUnitTitle, {}, true)

    const title = `NL Hold'em #${table.id} - ${small} / ${big} - Buy-In ${min} - ${max}`

    setTitle(title)
  }, [table])
}
