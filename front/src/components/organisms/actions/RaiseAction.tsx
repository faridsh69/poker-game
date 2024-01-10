import { Money } from 'src/components/molecules/Money'
import { ActionButton } from './ActionButton'

export const RaiseAction = (props: { raise: number; handleRaiseAction: () => void }) => {
  const { raise, handleRaiseAction } = props

  return (
    <ActionButton
      label={
        <div className='action-button-front-label'>
          <p className='action-button-front-label-p'>Raise to</p>
          <p className='action-button-front-label-p'>
            <Money money={raise} />
          </p>
        </div>
      }
      onClick={handleRaiseAction}
    />
  )
}
