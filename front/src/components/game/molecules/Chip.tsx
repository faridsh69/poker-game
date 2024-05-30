import ChipsImage from 'src/images/game/chips.png'

type TypeProps = { backgroundPosition: string; chipIndex: number; value: number }

export const Chip = (props: TypeProps) => {
  const { backgroundPosition, chipIndex, value } = props

  return (
    <div
      id={'value=' + value}
      className='cash-chips-column-chip'
      style={{
        backgroundImage: `url(${ChipsImage})`,
        backgroundPosition: backgroundPosition,
        zIndex: chipIndex,
      }}
    />
  )
}
