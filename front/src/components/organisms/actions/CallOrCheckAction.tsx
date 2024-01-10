import { useMemo } from 'react'

import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { getCallActionAmount } from 'src/helpers/clientHelpersPoker'
import { CheckAction } from './details/CheckAction'
import { CallAction } from './details/CallAction'

export const CallOrCheckAction = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  if (!callActionAmount) {
    return <CheckAction table={table} />
  }
  return <CallAction table={table} />
}
