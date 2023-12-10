import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'

import tableImage from 'src/images/table.jpg'
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
    <Card className='home-runtable' key={table.id}>
      <BuyinModal
        table={table}
        username={username}
        socket={socket}
        seatModal={seatModal}
        handleSitTableModal={handleSitTableModal}
      />
      <CardHeader
        className='home-runtable-header'
        title={`#${table.id} - ${table.type}`}
        subheader={table.title}
      />
      <CardContent className='home-runtable-main'>
        <TableSidebar table={table} username={username} socket={socket} />
        <div className='home-runtable-main-body'>
          <img src={tableImage} alt='poker-table' className='home-runtable-main-body-mainimage' />
          <TableCards table={table} />
          {!!table.pot && <div className='home-runtable-main-body-tablepot'>${table.pot}</div>}
          <TableActions table={table} username={username} socket={socket} />
          <TableSeats table={table} username={username} handleSitTableModal={handleSitTableModal} />
        </div>
      </CardContent>
    </Card>
  )
}
