import { BuyinModal } from 'src/components/game/templates/modals/BuyinModal'
import { ConfirmModal } from 'src/components/game/templates/modals/ConfirmModal'
import { TableWindow } from 'src/components/game/templates/table/TableWindow'
import { useTableCloseThenLeave } from 'src/hooks/game/useTableCloseThenLeave'
import { useTablePageTitle } from 'src/hooks/game/useTablePageTitle'
import { TypeTableProps } from 'src/interfaces'

export const TablePopupContainer = (props: TypeTableProps) => {
  const { table } = props

  useTablePageTitle(table)
  useTableCloseThenLeave(table.id)

  return (
    <div className='popup'>
      <ConfirmModal />
      <BuyinModal />
      <TableWindow table={table} />
    </div>
  )
}
