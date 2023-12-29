export const ActionButton = (props: { label: string | JSX.Element; onClick: () => void }) => {
  const { label, onClick } = props

  return (
    <div className='action-button' onClick={onClick}>
      <button className='action-button-pushable'>
        <span className='action-button-shadow'></span>
        <span className='action-button-edge'></span>
        <span className='action-button-front'>{label}</span>
      </button>
    </div>
  )
}
