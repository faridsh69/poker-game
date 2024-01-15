import { ChipSvg } from './ChipSvg'

export const Chip = props => {
  const { color } = props

  return (
    <div className='cash-chips-column-chip' style={{ color: color + 'a0' }}>
      <ChipSvg fill={color} />
    </div>
  )
}
