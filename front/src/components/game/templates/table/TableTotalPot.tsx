import { useTranslation } from 'react-i18next'
import { Money } from 'src/components/game/molecules/Money'
import { isAtLeastTwoNotSeatOutPlayers } from 'src/helpers/clientHelpersPoker'

import { TypeTableProps } from 'src/interfaces'

export const TableTotalPot = (props: TypeTableProps) => {
  const { table } = props

  const { t } = useTranslation()

  if (!isAtLeastTwoNotSeatOutPlayers(table)) {
    return <div className='dnd-window-body-table-total'>{t('Waiting for 2 ready players')}</div>
  }

  return (
    <div className='dnd-window-body-table-total'>
      <div className='dnd-window-body-table-total-label'>{t('Total Pot: ')}</div>
      <Money money={table.total} />
    </div>
  )
}
