import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button, FormControl, IconButton, InputAdornment, Modal, OutlinedInput, Slider } from '@mui/material'
import { useAtom } from 'jotai'

import { CountDownTimer } from 'src/components/game/molecules/CountDownTimer'
import { Money } from 'src/components/game/molecules/Money'
import { CLIENT_TIMEOUT_SEATOUT_ALLIN } from 'src/configs/clientConstantsPoker'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { getAuthUsername } from 'src/helpers/auth'
import { getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useSeatTimer } from 'src/hooks/useSeatTimer'

export const BuyinModal = () => {
  const username = getAuthUsername()
  const [buyinModal, setBuyinModal] = useAtom(buyinModalAtom)
  const [buyinAmount, setBuyinAmount] = useState<number>(0)
  const [inputValue, setInputValue] = useState<number>(0)

  const closeModel = () => {
    setBuyinModal({ show: false })
  }

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return

    const min = buyinModal.table.buyin.min

    setBuyinAmount(min)
  }, [buyinModal])

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return
    if (buyinAmount === inputValue) return

    const timeout = setTimeout(() => {
      setInputValue(buyinAmount)
    }, 300)

    return () => clearTimeout(timeout)
  }, [buyinAmount])

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return
    if (buyinAmount === inputValue) return
    if (inputValue < buyinModal.table.buyin.min) return
    if (inputValue > buyinModal.table.buyin.max) return

    setBuyinAmount(inputValue)
  }, [inputValue])

  const authSeat = buyinModal.table ? getUserSeat(buyinModal.table, username) : null

  const remainingSeconds = useSeatTimer(authSeat, 'leaveSeat')

  if (!buyinModal.table || !buyinModal.show) return null

  return (
    <Modal open={buyinModal.show} onClose={closeModel} className='buyin-modal'>
      <div className='buyin-modal-container'>
        <div className='buyin-modal-container-header'>
          <div className='buyin-modal-container-header-title'>Buy-in Option</div>
          <IconButton onClick={closeModel} className='buyin-modal-container-header-close'>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='buyin-modal-container-body'>
          <div className='buyin-modal-container-body-title'>
            <Money money={buyinModal.table.blinds.small} /> / <Money money={buyinModal.table.blinds.big} />
            {` NL Hold'em #${buyinModal.table.id}`}
          </div>
          <div className='buyin-modal-container-body-balance'>
            <div className='buyin-modal-container-body-balance-label'>Balance</div>
            <div className='buyin-modal-container-body-balance-value'>
              <Money money={authSeat?.user.cash.inBank || 0} />
            </div>
          </div>
          <div className='buyin-modal-container-body-slider'>
            <div
              className='buyin-modal-container-body-slider-min'
              onClick={() => setBuyinAmount(buyinModal.table?.buyin.min || 0)}
            >
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
            <div
              className='buyin-modal-container-body-slider-min'
              onClick={() => setBuyinAmount(buyinModal.table?.buyin.max || 0)}
            >
              <div className='buyin-modal-container-body-slider-min-label'>Maximum</div>
              <div className='buyin-modal-container-body-slider-min-value'>
                <Money money={buyinModal.table.buyin.max} />
              </div>
            </div>
          </div>
          <div className='buyin-modal-container-body-input'>
            Buy-in Amount
            <FormControl>
              <OutlinedInput
                value={inputValue}
                onChange={e => setInputValue(+e.target.value || 0)}
                size='small'
                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
              />
            </FormControl>
          </div>
          <div className='buyin-modal-container-body-timer'>
            <CountDownTimer
              remainingSeconds={remainingSeconds}
              onFinishTimer={closeModel}
              type='circle'
              duration={CLIENT_TIMEOUT_SEATOUT_ALLIN}
            />
            Second(s) left.
          </div>
          <div className='buyin-modal-container-body-actions'>
            <Button color='success' variant='contained' onClick={() => buyinModal.onBuyin?.(buyinAmount)}>
              Ok
            </Button>
            <Button color='secondary' variant='contained' onClick={closeModel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
