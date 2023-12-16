import { useState } from 'react'
import { Card, CardContent } from '@mui/material'

import tableImage from 'src/images/table.png'
import { BuyinModal } from 'src/components/organisms/modals/BuyinModal'
import { TableSeats } from 'src/components/organisms/table/TableSeats'
import { TableActions } from 'src/components/organisms/table/TableActions'
import { TableCards } from 'src/components/organisms/table/TableCards'
import { TableSidebar } from 'src/components/organisms/table/TableSidebar'
import { TypeHandleSitTableModal, TypeSeatModal, TypeTable } from 'src/interfaces/type-game'

export const TableWindow = (props: { table: TypeTable }) => {
  const { table } = props

  const [seatModal, setSeatModal] = useState<TypeSeatModal>({ tableId: 0, seatId: 0 })

  const handleSitTableModal: TypeHandleSitTableModal = (tableId, seatId) => {
    setSeatModal({
      tableId,
      seatId,
    })
  }

  return (
    <Card className='dnd-window-body-table' key={table.id}>
      <img src={tableImage} className='dnd-window-body-table-backgroundimg' alt='poker-table' />
      <BuyinModal table={table} seatModal={seatModal} handleSitTableModal={handleSitTableModal} />

      <CardContent className='home-runtable-main'>
        <TableSidebar table={table} />
        <div className='home-runtable-main-body'>
          <TableCards table={table} />
          {!!table.pot && <div className='home-runtable-main-body-tablepot'>${table.pot}</div>}
          <TableActions table={table} />
          <TableSeats table={table} handleSitTableModal={handleSitTableModal} />
        </div>
      </CardContent>
    </Card>
  )
}
