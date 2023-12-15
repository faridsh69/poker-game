import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'

import tableImage from 'src/images/table.png'
import { BuyinModal } from 'src/components/poker/molecules/BuyinModal'
import { TableSeats } from 'src/components/poker/molecules/TableSeats'
import { TableActions } from 'src/components/poker/molecules/TableActions'
import { TableCards } from 'src/components/poker/molecules/TableCards'
import { TableSidebar } from 'src/components/poker/molecules/TableSidebar'
import {
  TypeHandleSitTableModal,
  TypeSeatModal,
  TypeSocket,
  TypeTable,
} from 'src/interfaces/type-game'

export const UserTable = (props: { table: TypeTable; username: string; socket: TypeSocket }) => {
  const { table, username, socket } = props

  const [seatModal, setSeatModal] = useState<TypeSeatModal>({ tableId: 0, seatId: 0 })

  const handleSitTableModal: TypeHandleSitTableModal = (tableId, seatId) => {
    setSeatModal({
      tableId,
      seatId,
    })
  }

  return (
    <Card className='dnd-window-body-table' key={table.id}>
      <img className='dnd-window-body-table-backgroundimg' src={tableImage} alt='poker-table' />
      <BuyinModal
        table={table}
        username={username}
        socket={socket}
        seatModal={seatModal}
        handleSitTableModal={handleSitTableModal}
      />

      <CardContent className='home-runtable-main'>
        <TableSidebar table={table} username={username} socket={socket} />
        <div className='home-runtable-main-body'>
          <TableCards table={table} />
          {!!table.pot && <div className='home-runtable-main-body-tablepot'>${table.pot}</div>}
          <TableActions table={table} username={username} socket={socket} />
          <TableSeats table={table} username={username} handleSitTableModal={handleSitTableModal} />
        </div>
      </CardContent>
    </Card>
  )
}
