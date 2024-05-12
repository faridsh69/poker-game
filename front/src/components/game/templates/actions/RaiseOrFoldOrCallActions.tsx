import { useMemo } from 'react'

import { CallOrCheckAction } from 'src/components/game/templates/actions/CallOrCheckAction'
import { FoldAction } from 'src/components/game/templates/actions/details/FoldAction'
import { RaiseAction } from 'src/components/game/templates/actions/details/RaiseAction'
import { RaiseActionFirstRow } from 'src/components/game/templates/actions/details/RaiseActionFirstRow'
import { TimeBank } from 'src/components/game/templates/actions/details/TimeBank'
import { getCallActionAmount, isOneOtherPersonToCallRaise } from 'src/helpers/clientHelpersPoker'
import { useRaiseActions } from 'src/hooks/game/useRaiseActions'
import { TypeTableProps } from 'src/interfaces'

export const RaiseOrFoldOrCallActions = (props: TypeTableProps) => {
  const { table } = props

  const { raise, realRestOfRaise, raiseLimits, changeRaiseAmount, handleRaiseAction } = useRaiseActions(table)

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table)
  }, [table])

  const userCanRaise = realRestOfRaise > callActionAmount && isOneOtherPersonToCallRaise(table)

  return (
    <div className='dnd-window-body-table-actions-gameturn'>
      {userCanRaise && (
        <RaiseActionFirstRow raise={raise} raiseLimits={raiseLimits} changeRaiseAmount={changeRaiseAmount} />
      )}

      <div className='dnd-window-body-table-actions-gameturn-secondrow'>
        <FoldAction table={table} callActionAmount={callActionAmount} />
        <CallOrCheckAction table={table} callActionAmount={callActionAmount} />
        {userCanRaise && (
          <RaiseAction raise={raise} realRestOfRaise={realRestOfRaise} handleRaiseAction={handleRaiseAction} />
        )}
      </div>

      <TimeBank table={table} />
    </div>
  )
}
