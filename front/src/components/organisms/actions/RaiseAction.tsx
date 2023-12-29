import { Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { Money } from 'src/components/molecules/Money'

export const RaiseButtons = (props: any) => {
  const { raiseActionAmount, setRaiseActionAmount, callActionAmount, big } = props

  const [raiseLimits, setRaiseLimits] = useState({
    min: 0,
    max: 0,
    step: 1,
  })

  useEffect(() => {
    const raiseStep = callActionAmount || big
    const raiseMin = 2 * callActionAmount || big
    setRaiseLimits({
      min: raiseMin,
      max: raiseStep * 10,
      step: raiseStep,
    })
    setRaiseActionAmount(raiseMin)
  }, [callActionAmount, big, setRaiseActionAmount])

  return (
    <>
      <div className='dnd-window-body-table-actions-gameturn-raisebuttons-percentactions'>
        <button onClick={() => setRaiseActionAmount(33)}>33%</button>
        <button onClick={() => setRaiseActionAmount(50)}>50%</button>
        <button onClick={() => setRaiseActionAmount(75)}>75%</button>
        <button onClick={() => setRaiseActionAmount(100)}>100%</button>
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
    </>
  )
}
/* <CountDownTimer onFinishTimer={() => handleCheckAction(table.id)} />

       */
