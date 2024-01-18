import { Money } from 'src/components/molecules/Money'
import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const CallAction = (props: TypeTableProps & { callActionAmount: number }) => {
  const { table, callActionAmount } = props

  const { handleCallAction } = useSocketActions(table.id)

  return (
    <ActionButton
      label={
        <div className='action-button-front-label'>
          <p className='action-button-front-label-p'>Call</p>
          <p className='action-button-front-label-p'>
            <Money money={callActionAmount} />
          </p>
        </div>
      }
      onClick={() => handleCallAction(callActionAmount)}
    />
  )
}
