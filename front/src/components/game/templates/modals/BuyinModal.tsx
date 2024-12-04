import { useCallback, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button, FormControl, IconButton, InputAdornment, Modal, OutlinedInput, Slider } from '@mui/material'
import { useAtom } from 'jotai'

import { CountDownTimer } from 'src/components/game/molecules/CountDownTimer'
import { Money } from 'src/components/game/molecules/Money/Money'
import { CLIENT_TIMEOUT_SEATOUT_ALLIN } from 'src/configs/clientConstantsPoker'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { getAuthUsername } from 'src/helpers/auth'
import { getBuyinModalStep, getUserSeat } from 'src/helpers/clientHelpersPoker'
import { useGetTransformScale } from 'src/hooks/useGetTransformScale'
import { useSeatTimer } from 'src/hooks/useSeatTimer'

export const BuyinModal = () => {
  const username = getAuthUsername()
  const [buyinModal, setBuyinModal] = useAtom(buyinModalAtom)

  const [buyinAmount, setBuyinAmount] = useState<number>(0)
  const [inputValue, setInputValue] = useState<number>(0)

  const isAddMoreChips = buyinModal.addMoreChips
  const min = isAddMoreChips ? 0 : buyinModal.table?.buyin?.min || 0
  const max = buyinModal.table?.buyin?.max || 0
  const step = getBuyinModalStep(min, max)

  const closeModel = () => {
    setBuyinModal({ show: false })
  }

  useEffect(() => {
    if (!buyinModal.table || !buyinModal.show) return

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
    if (inputValue < min) return
    if (inputValue > max) return

    setBuyinAmount(inputValue)
  }, [inputValue])

  const handleBuyin = useCallback(() => buyinModal.onBuyin?.(buyinAmount), [buyinModal.onBuyin, buyinAmount])

  const authSeat = buyinModal.table ? getUserSeat(buyinModal.table, username) : null

  const remainingSeconds = useSeatTimer(authSeat, 'leaveSeat')

  const style = useGetTransformScale(500, 450)

  const inputUnitValue = inputValue * 0.000015
  const setInputUnitValue = (v: number) => {
    setInputValue(v * 10000)
  }

  if (!buyinModal.table || !buyinModal.show) return null

  return (
    <Modal open={buyinModal.show} onClose={closeModel} className='buyin-modal'>
      <div className='buyin-modal-container' style={style}>
        <div className='buyin-modal-container-header'>
          <div className='buyin-modal-container-header-title'>{!isAddMoreChips ? 'Buy-in Option' : 'Add Chips'}</div>
          <IconButton onClick={closeModel} className='buyin-modal-container-header-close'>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='buyin-modal-container-body'>
          <div className='buyin-modal-container-body-title'>
            <Money money={buyinModal.table.blinds.small} brif /> / <Money money={buyinModal.table.blinds.big} brif />
            {` NL Hold'em #${buyinModal.table.id}`}
          </div>
          <div className='buyin-modal-container-body-balance'>
            <div className='buyin-modal-container-body-balance-label'>Balance</div>
            <div className='buyin-modal-container-body-balance-value'>
              <Money money={authSeat?.user.cash.inBank || 0} />
            </div>
          </div>
          <div className='buyin-modal-container-body-slider'>
            <div className='buyin-modal-container-body-slider-min' onClick={() => setBuyinAmount(min)}>
              <div className='buyin-modal-container-body-slider-min-label'>Minimum</div>
              <div className='buyin-modal-container-body-slider-min-value'>
                <Money money={min} brif />
              </div>
            </div>
            <div className='buyin-modal-container-body-slider-main'>
              <Slider
                value={buyinAmount}
                min={min}
                step={step}
                max={max}
                valueLabelFormat={val => '$' + val}
                onChange={(_, val) => setBuyinAmount(+val)}
                valueLabelDisplay='auto'
              />
            </div>
            <div className='buyin-modal-container-body-slider-min' onClick={() => setBuyinAmount(max)}>
              <div className='buyin-modal-container-body-slider-min-label'>Maximum</div>
              <div className='buyin-modal-container-body-slider-min-value'>
                <Money money={max} brif />
              </div>
            </div>
          </div>
          <div className='buyin-modal-container-body-input'>
            Buy-in Amount
            <FormControl>
              <OutlinedInput
                value={inputUnitValue}
                onChange={e => setInputUnitValue(+e.target.value || 0)}
                size='small'
                startAdornment={<InputAdornment position='start'></InputAdornment>}
              />
            </FormControl>
          </div>
          <div className='buyin-modal-container-body-timer'>
            <CountDownTimer
              remainingSeconds={remainingSeconds}
              onFinishTimer={closeModel}
              type='text'
              duration={CLIENT_TIMEOUT_SEATOUT_ALLIN}
            />
            Second(s) left.
          </div>
          <div className='buyin-modal-container-body-actions'>
            <Button color='success' variant='contained' onClick={handleBuyin}>
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
