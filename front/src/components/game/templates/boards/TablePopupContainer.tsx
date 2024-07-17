import { BuyinModal } from 'src/components/game/templates/modals/BuyinModal'
import { ConfirmModal } from 'src/components/game/templates/modals/ConfirmModal'
import { TableWindow } from 'src/components/game/templates/table/TableWindow'
import { useTableCloseThenLeave } from 'src/hooks/game/useTableCloseThenLeave'
import { useTablePageTitle } from 'src/hooks/game/useTablePageTitle'
import { useBodyClassname } from 'src/hooks/useBodyClassname'
import { useGetTransformScale } from 'src/hooks/useGetTransformScale'
import { TypeTableProps } from 'src/interfaces'

export const TablePopupContainer = (props: TypeTableProps) => {
  const { table } = props

  useTablePageTitle(table)
  useBodyClassname('popup-body')
  useTableCloseThenLeave(table.id)
  const style = useGetTransformScale(800, 550)

  return (
    <div className='popup' style={style}>
      <ConfirmModal />
      <BuyinModal />
      <TableWindow table={table} />
    </div>
  )
}
