export const PotRaiseButton = (props: { percent: number; changeRaiseAmount: (r: number, p?: number) => void }) => {
  const { changeRaiseAmount, percent } = props

  const handleChangeRaisePot = () => {
    changeRaiseAmount(0, percent / 100)
  }

  return (
    <button
      className='dnd-window-body-table-actions-gameturn-firstrow-percentactions-potaction'
      onClick={handleChangeRaisePot}
    >
      {percent}%
    </button>
  )
}
