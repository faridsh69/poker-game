import { PotRaiseButton } from './PotRaiseButton'
import { RaiseInput } from './RaiseInput'
import { Slider } from '@mui/material'

import { TypeRaiseLimits } from 'src/interfaces'

export const RaiseActionFirstRow = (props: {
  raise: number
  raiseLimits: TypeRaiseLimits
  changeRaiseAmount: (r: number, p?: number) => void
}) => {
  const { raise, raiseLimits, changeRaiseAmount } = props

  return (
    <div className='dnd-window-body-table-actions-gameturn-firstrow'>
      <div className='dnd-window-body-table-actions-gameturn-firstrow-percentactions'>
        <PotRaiseButton changeRaiseAmount={changeRaiseAmount} percent={33} />
        <PotRaiseButton changeRaiseAmount={changeRaiseAmount} percent={50} />
        <PotRaiseButton changeRaiseAmount={changeRaiseAmount} percent={75} />
        <PotRaiseButton changeRaiseAmount={changeRaiseAmount} percent={100} />
      </div>
      <div className='dnd-window-body-table-actions-gameturn-firstrow-price'>
        <RaiseInput value={raise} min={raiseLimits.min} max={raiseLimits.max} changeRaiseAmount={changeRaiseAmount} />
      </div>
      <Slider
        className='dnd-window-body-table-actions-gameturn-firstrow-slider'
        value={raise}
        min={raiseLimits.min}
        step={raiseLimits.step}
        max={raiseLimits.max}
        valueLabelFormat={val => '$' + val}
        onChange={(_, val) => changeRaiseAmount(val as number)}
        valueLabelDisplay='auto'
      />
    </div>
  )
}
