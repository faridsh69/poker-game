import { Slider } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Money } from 'src/components/molecules/Money'
import { ActionButton } from './ActionButton'
import {
  getMaximumRaiseAmount,
  getMinimumRaiseAmount,
  getStepRaiseAmount,
} from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { useAtom } from 'jotai'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'

export const RaiseButtons = (props: any) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [raiseActionAmount, setRaiseActionAmount] = useState<number>(0)

  const handleRaiseAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.raiseAction, { tableId: table.id, raiseActionAmount, username })
  }, [socket, username, raiseActionAmount, table.id])

  const minimumRaiseAmount = useMemo(() => {
    return getMinimumRaiseAmount(table)
  }, [table])

  const stepRaiseAmount = useMemo(() => {
    return getStepRaiseAmount(table)
  }, [table])

  const maximumRaiseAmount = useMemo(() => {
    return getMaximumRaiseAmount(table, username)
  }, [table, username])

  const [raiseLimits, setRaiseLimits] = useState({
    min: 0,
    max: 0,
    step: 1,
  })

  useEffect(() => {
    const realMinimum = Math.min(minimumRaiseAmount, maximumRaiseAmount)
    setRaiseLimits({
      min: realMinimum,
      max: maximumRaiseAmount,
      step: stepRaiseAmount,
    })
    setRaiseActionAmount(realMinimum)
  }, [stepRaiseAmount, minimumRaiseAmount, maximumRaiseAmount])

  const changeRaiseAmount = (price: number, percentPot: number = 0) => {
    const raise = percentPot ? percentPot * table.pot : price
    const realMinimum = Math.min(minimumRaiseAmount, maximumRaiseAmount)

    if (raise < realMinimum) {
      setRaiseActionAmount(realMinimum)
      return
    }

    if (raise > maximumRaiseAmount) {
      setRaiseActionAmount(maximumRaiseAmount)
      return
    }

    setRaiseActionAmount(raise)
  }

  return (
    <>
      <div className='dnd-window-body-table-actions-gameturn-raisebuttons-percentactions'>
        <button onClick={() => changeRaiseAmount(0, 0.33)}>33%</button>
        <button onClick={() => changeRaiseAmount(0, 0.5)}>50%</button>
        <button onClick={() => changeRaiseAmount(0, 0.75)}>75%</button>
        <button onClick={() => changeRaiseAmount(0, 1)}>100%</button>
      </div>
      <div className='dnd-window-body-table-actions-gameturn-raisebuttons-price'>
        <Money money={raiseActionAmount} />
      </div>
      <Slider
        className='dnd-window-body-table-actions-gameturn-raisebuttons-slider'
        value={raiseActionAmount}
        min={raiseLimits.min}
        step={raiseLimits.step}
        max={raiseLimits.max}
        valueLabelFormat={val => '$' + val}
        onChange={(_, val) => setRaiseActionAmount(+val)}
        valueLabelDisplay='auto'
      />
      <ActionButton
        label={
          <div className='action-button-front-label'>
            <p className='action-button-front-label-p'>Raise to</p>
            <p className='action-button-front-label-p'>
              <Money money={raiseActionAmount} />
            </p>
          </div>
        }
        onClick={handleRaiseAction}
      />
    </>
  )
}
/* <CountDownTimer onFinishTimer={() => handleCheckAction(table.id)} />

       */
