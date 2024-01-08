import { useTranslation } from 'react-i18next'
import { Money } from 'src/components/molecules/Money'
import { isWaitPhase } from 'src/helpers/clientHelpersPoker'

import { TypeTableProps } from 'src/interfaces'

export const TableTotalPot = (props: TypeTableProps) => {
  const { table } = props

  const { t } = useTranslation()

  if (isWaitPhase(table)) {
    return <div className='dnd-window-body-table-total'>
      {t('Waiting for 2 ready players')}
    </div>
  }

  return (
    <div className='dnd-window-body-table-total'>
      <span>Total Pot :</span>
      <Money money={table.total} />
    </div>
  )
}
