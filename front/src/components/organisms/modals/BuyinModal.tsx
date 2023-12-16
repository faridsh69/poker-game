import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { Button, Modal, Slider } from '@mui/material'

import { TypeHandleSitTableModal, TypeSeatModal, TypeTable } from 'src/interfaces/type-game'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { socketAtom } from 'src/contexts/socketAtom'
import { useAuth } from 'src/hooks/useAuth'

export const BuyinModal = (props: {
  table: TypeTable
  seatModal: TypeSeatModal
  handleSitTableModal: TypeHandleSitTableModal
}) => {
  const { table, seatModal, handleSitTableModal } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [buyinAmount, setBuyinAmount] = useState<number>(0)

  const handleSitTable = useCallback(
    (tableId: number, seatId: number, buyinAmount: number) => {
      socket.emit(CLIENT_CHANNELS.joinSeat, { tableId, seatId, buyinAmount, username })
      handleSitTableModal(0, 0)
    },
    [socket, username, handleSitTableModal],
  )

  useEffect(() => {
    if (!seatModal.tableId) return

    const min = table.buyin.min
    const max = table.buyin.max

    setBuyinAmount((max + min) / 2)
  }, [seatModal, table.buyin.min, table.buyin.max])

  if (!seatModal.tableId) return null

  return (
    <Modal open={!!seatModal.tableId} onClose={() => handleSitTableModal(0, 0)}>
      <div className='modal'>
        <h3>Set Buy In for {table.title}</h3>
        <div>
          <Slider
            value={buyinAmount}
            min={table.buyin.min}
            step={10}
            max={table.buyin.max}
            valueLabelFormat={val => '$' + val}
            onChange={(_, val) => setBuyinAmount(+val)}
            valueLabelDisplay='auto'
          />
        </div>
        <Button
          color='success'
          variant='contained'
          onClick={() => handleSitTable(seatModal.tableId, seatModal.seatId, buyinAmount)}
        >
          Seat with {buyinAmount}
        </Button>
      </div>
    </Modal>
  )
}
