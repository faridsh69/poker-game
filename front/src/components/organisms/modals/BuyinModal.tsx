import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Button, IconButton, Modal, Slider, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { Money } from 'src/components/molecules/Money'

export const BuyinModal = () => {
  const { username } = useAuth()
  const [buyinModal, setBuyinModal] = useAtom(buyinModalAtom)
  const [buyinAmount, setBuyinAmount] = useState<number>(0)
  const [inputValue, setInputValue] = useState<number>(0)

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return

    const min = buyinModal.table.buyin.min

    setBuyinAmount(min)
  }, [buyinModal])

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return

    let value = Math.max(inputValue, buyinModal.table.buyin.min)
    value = Math.min(inputValue, buyinModal.table.buyin.max)

    setBuyinAmount(value)
  }, [buyinModal, inputValue])

  useEffect(() => {
    if (buyinAmount === inputValue) return

    setInputValue(buyinAmount)
  }, [buyinAmount, inputValue])

  if (!buyinModal.table || !buyinModal.show) return null

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
            className='buyin-modal-container-header-close'
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='buyin-modal-container-body'>
          <div className='buyin-modal-container-body-title'>
            <Money money={buyinModal.table.blinds.small} /> /{' '}
            <Money money={buyinModal.table.blinds.big} />
            {` NL Hold'em #${buyinModal.table.id}`}
          </div>
          <div className='buyin-modal-container-body-balance'>
            <div className='buyin-modal-container-body-balance-label'>Balance</div>
            <div className='buyin-modal-container-body-balance-value'>
              <Money money={authSeat?.user.cash.inBank || 0} />
            </div>
          </div>
          <div className='buyin-modal-container-body-slider'>
            <div className='buyin-modal-container-body-slider-min'>
              <div className='buyin-modal-container-body-slider-min-label'>Minimum</div>
              <div className='buyin-modal-container-body-slider-min-value'>
                <Money money={buyinModal.table.buyin.min} />
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
                <Money money={buyinModal.table.buyin.max} />
              </div>
            </div>
          </div>
          <div className='buyin-modal-container-body-input'>
            Buy-in Amount{' '}
            <TextField value={inputValue} onChange={e => setInputValue(+e.target.value)} />
          </div>
          <div className='buyin-modal-container-body-timer'></div>
          <div className='buyin-modal-container-body-actions'>
            <Button
              color='success'
              variant='contained'
              onClick={() => buyinModal.onBuyin?.(buyinAmount)}
            >
              Ok
            </Button>
            <Button color='success' variant='contained'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
