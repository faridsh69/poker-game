import { useMemo } from 'react'

import { BuyinModal } from 'src/components/game/templates/modals/BuyinModal'
import { ConfirmModal } from 'src/components/game/templates/modals/ConfirmModal'
import { TableWindow } from 'src/components/game/templates/table/TableWindow'
import { useTableCloseThenLeave } from 'src/hooks/game/useTableCloseThenLeave'
import { useTablePageTitle } from 'src/hooks/game/useTablePageTitle'
import { useWindowWidth } from 'src/hooks/useWindowWidth'
import { TypeTableProps } from 'src/interfaces'

export const TablePopupContainer = (props: TypeTableProps) => {
  const { table } = props

  useTablePageTitle(table)
  useTableCloseThenLeave(table.id)

  const width = useWindowWidth()

  const scale = useMemo(() => {
    return width > 800 ? 1 : width / 800
  }, [width])

  return (
    <div className='popup' style={{ transform: `scale(${scale})` }}>
      <ConfirmModal />
      <BuyinModal />
      <TableWindow table={table} />
    </div>
  )
}
