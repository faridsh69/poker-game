import { Money } from 'src/components/molecules/Money'
import { ActionButton } from './ActionButton'

export const RaiseAction = (props: {
  raise: number
  handleRaiseAction: (raise: number) => void
  realRestOfRaise: number
}) => {
  const { raise, realRestOfRaise, handleRaiseAction } = props

  return (
    <ActionButton
      label={
        <div className='action-button-front-label'>
          <div className='action-button-front-label-p'>Raise to</div>
          <div className='action-button-front-label-p'>
            <Money money={raise} />
          </div>
        </div>
      }
      onClick={() => handleRaiseAction(realRestOfRaise)}
    />
  )
}
