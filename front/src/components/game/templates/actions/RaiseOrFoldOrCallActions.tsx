import { useMemo } from 'react'

import { getCallActionAmount, isOneOtherPersonToCallRaise } from 'src/helpers/clientHelpersPoker'
import { RaiseActionFirstRow } from 'src/components/game/templates/actions/details/RaiseActionFirstRow'
import { CallOrCheckAction } from 'src/components/game/templates/actions/CallOrCheckAction'
import { RaiseAction } from 'src/components/game/templates/actions/details/RaiseAction'
import { FoldAction } from 'src/components/game/templates/actions/details/FoldAction'
import { TimeBank } from 'src/components/game/templates/actions/details/TimeBank'
import { useRaiseActions } from 'src/hooks/game/useRaiseActions'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'

export const RaiseOrFoldOrCallActions = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const { raise, realRestOfRaise, raiseLimits, changeRaiseAmount, handleRaiseAction } =
    useRaiseActions(table)

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  const userCanRaise =
    realRestOfRaise > callActionAmount && isOneOtherPersonToCallRaise(table, username)

  return (
    <div className='dnd-window-body-table-actions-gameturn'>
      {userCanRaise && (
        <RaiseActionFirstRow
          raise={raise}
          raiseLimits={raiseLimits}
          changeRaiseAmount={changeRaiseAmount}
        />
      )}

      <div className='dnd-window-body-table-actions-gameturn-secondrow'>
        <FoldAction table={table} callActionAmount={callActionAmount} />
        <CallOrCheckAction table={table} callActionAmount={callActionAmount} />
        {userCanRaise && (
          <RaiseAction
            raise={raise}
            realRestOfRaise={realRestOfRaise}
            handleRaiseAction={handleRaiseAction}
          />
        )}
      </div>

      <TimeBank table={table} />
    </div>
  )
}
