import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Button, IconButton, Modal, Slider, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'

export const BuyinModal = () => {
  const { username } = useAuth()
  const [buyinModal, setBuyinModal] = useAtom(buyinModalAtom)
  const [buyinAmount, setBuyinAmount] = useState<number>(0)

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return

    const min = buyinModal.table.buyin.min

    setBuyinAmount(min)
  }, [buyinModal])

  if (!buyinModal.table || !buyinModal.show) return null

  console.log('1 buyinModal', buyinModal)

  const authSeat = getUserSeat(buyinModal.table, username)

  return (
    <Modal
      open={buyinModal.show}
      onClose={() => setBuyinModal({ show: false })}
      className='buyin-modal'
    >
      <div className='buyin-modal-container'>
        <div className='buyin-modal-container-header'>
          <div className='buyin-modal-container-header-title'>Buy-in Option</div>
          <IconButton
            // onMouseDown={handleConfirmLeaveTable}
            className='buyin-modal-container-header-title-close'
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='buyin-modal-container-body'>
          <div className='buyin-modal-container-body-title'>
            ${buyinModal.table.small} / ${buyinModal.table.big} NL Hold'em #{buyinModal.table.id}
          </div>
          <div className='buyin-modal-container-body-balance'>
            <div className='buyin-modal-container-body-balance-label'>Balance</div>
            <div className='buyin-modal-container-body-balance-value'>
              ${authSeat?.user.cash.inBank}
            </div>
          </div>
          <div className='buyin-modal-container-body-slider'>
            <div className='buyin-modal-container-body-slider-min'>
              <div className='buyin-modal-container-body-slider-min-label'>Minimum</div>
              <div className='buyin-modal-container-body-slider-min-value'>
                ${buyinModal.table.buyin.min}
              </div>
            </div>
            <div className='buyin-modal-container-body-slider-main'>
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
            <div className='buyin-modal-container-body-slider-min'>
              <div className='buyin-modal-container-body-slider-min-label'>Maximum</div>
              <div className='buyin-modal-container-body-slider-min-value'>
                ${buyinModal.table.buyin.max}
              </div>
            </div>
          </div>
          <div className='buyin-modal-container-body-input'>
            Buy-in Amount <TextField />
          </div>
          <div className='buyin-modal-container-body-timer'></div>
          <div className='buyin-modal-container-body-actions'>
            <Button
              color='success'
              variant='contained'
              onClick={() => buyinModal.onBuyin?.(buyinAmount)}
            >
              Seat with {buyinAmount}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
