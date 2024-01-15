import { useMemo } from 'react'

import { Money } from 'src/components/molecules/Money'
import { useAuth } from 'src/hooks/useAuth'
import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { getCallActionAmount } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const CallAction = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const { handleCallAction } = useSocketActions(table.id)

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

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
