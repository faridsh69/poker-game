import { Money } from 'src/components/game/molecules/Money/Money'
import { ActionButton } from 'src/components/game/templates/actions/details/ActionButton'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const CallAction = (props: TypeTableProps & { callActionAmount: number }) => {
  const { table, callActionAmount } = props

  const { handleCallAction } = useSocketActions(table.id)

  return (
    <ActionButton
      label={
        <div className='action-button-front-label'>
          <div className='action-button-front-label-p'>Call</div>
          <div className='action-button-front-label-p'>
            <Money money={callActionAmount} />
          </div>
        </div>
      }
      onClick={() => handleCallAction(callActionAmount)}
    />
  )
}
