import { WindowTopBar } from 'src/components/game/templates/boards/WindowTopBar'
import { DndWindow } from 'src/components/game/templates/dnd/DndWindow'
import { BuyinModal } from 'src/components/game/templates/modals/BuyinModal'
import { ConfirmModal } from 'src/components/game/templates/modals/ConfirmModal'
import { TableWindow } from 'src/components/game/templates/table/TableWindow'
import { TypeTableProps } from 'src/interfaces'

export const TablePopupContainer = (props: TypeTableProps) => {
  const { table } = props

  return (
    <>
      <ConfirmModal />
      <BuyinModal />
      <DndWindow key={table.id} topbar={<WindowTopBar table={table} />} body={<TableWindow table={table} />} />
    </>
  )
}
