import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../useAuth'
import { getRaiseActionAmount, getRaiseLimits } from 'src/helpers/clientHelpersPoker'
import { TypeTable } from 'src/interfaces'

import { useSocketActions } from './useSocketActions'

export const useRaiseActions = (table: TypeTable) => {
  const { username } = useAuth()
  const { handleRaiseAction } = useSocketActions(table.id)
  const [raise, setRaise] = useState<number>(0)

  const raiseLimits = useMemo(() => {
    return getRaiseLimits(table, username)
  }, [table, username])

  const realRestOfRaise = useMemo(() => {
    return getRaiseActionAmount(table, username, raise)
  }, [table, username, raise])

  useEffect(() => {
    setRaise(raiseLimits.min)
  }, [raiseLimits.min])

  const changeRaiseAmount = useCallback(
    (price: number, percentPot: number = 0) => {
      let raise = percentPot ? percentPot * table.total : price
      raise = Math.max(raise, raiseLimits.min)
      raise = Math.min(raise, raiseLimits.max)

      setRaise(raise)
    },
    [setRaise, table.total, raiseLimits.min, raiseLimits.max],
  )

  return { raise, realRestOfRaise, raiseLimits, changeRaiseAmount, handleRaiseAction }
}
