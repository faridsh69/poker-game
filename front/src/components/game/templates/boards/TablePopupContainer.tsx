import { WindowTopBar } from 'src/components/game/templates/boards/WindowTopBar'
import { BuyinModal } from 'src/components/game/templates/modals/BuyinModal'
import { ConfirmModal } from 'src/components/game/templates/modals/ConfirmModal'
import { TableWindow } from 'src/components/game/templates/table/TableWindow'
import { useTablePageTitle } from 'src/hooks/game/useTablePageTitle'
import { TypeTableProps } from 'src/interfaces'

export const TablePopupContainer = (props: TypeTableProps) => {
  const { table } = props

  useTablePageTitle(table)

  return (
    <>
      <ConfirmModal />
      <BuyinModal />
      <WindowTopBar table={table} />
      <TableWindow table={table} />
    </>
  )
}
