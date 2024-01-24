// import { ChipSvg } from './ChipSvg'
import ChipsImage from 'src/images/game/chips.png'

export const Chip = (props: { backgroundPosition: string; chipIndex: number }) => {
  const { backgroundPosition, chipIndex } = props

  return (
    <div
      className='cash-chips-column-chip'
      style={{
        backgroundImage: `url(${ChipsImage})`,
        backgroundPosition: backgroundPosition,
        zIndex: chipIndex,
      }}
    >
      {/* <div className='cash-chips-column-chip-edge' /> */}
    </div>
  )
}
