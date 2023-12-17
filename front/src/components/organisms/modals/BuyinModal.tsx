import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Button, Modal, Slider } from '@mui/material'

import { buyinModalAtom } from 'src/contexts/buyinModalAtom'

export const BuyinModal = () => {
  const [buyinModal, setBuyinModal] = useAtom(buyinModalAtom)

  const [buyinAmount, setBuyinAmount] = useState<number>(0)

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return

    const min = buyinModal.table.buyin.min

    setBuyinAmount(min)
  }, [buyinModal])

  if (!buyinModal.table || !buyinModal.show) return null

  return (
    <Modal
      open={buyinModal.show}
      onClose={() => setBuyinModal({ show: false })}
      sx={{ zIndex: 10003 }}
    >
      <div className='modal'>
        <h3>Set Buy In for {buyinModal.table.title}</h3>
        <div>
          <Slider
            value={buyinAmount}
            min={buyinModal.table.buyin.min}
            step={10}
            max={buyinModal.table.buyin.max}
            valueLabelFormat={val => '$' + val}
            onChange={(_, val) => setBuyinAmount(+val)}
            valueLabelDisplay='auto'
          />
        </div>
        <Button
          color='success'
          variant='contained'
          onClick={() => buyinModal.onBuyin?.(buyinAmount)}
        >
          Seat with {buyinAmount}
        </Button>
      </div>
    </Modal>
  )
}
