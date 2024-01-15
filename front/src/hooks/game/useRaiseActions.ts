import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../useAuth'
import { useAtom } from 'jotai'
import { socketAtom } from 'src/contexts/socketAtom'
import { getRaiseActionAmount, getRaiseLimits } from 'src/helpers/clientHelpersPoker'
import { TypeTable } from 'src/interfaces'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'

export const useRaiseActions = (table: TypeTable) => {
  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [raise, setRaise] = useState<number>(0)

  const raiseActionAmount = useMemo(() => {
    return getRaiseActionAmount(table, username, raise)
  }, [table, username, raise])

  const raiseLimits = useMemo(() => {
    return getRaiseLimits(table, username)
  }, [table, username])

  useEffect(() => {
    setRaise(raiseLimits.min)
  }, [raiseLimits.min])

  const handleRaiseAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.raiseAction, {
      tableId: table.id,
      raiseActionAmount,
      username,
    })
  }, [socket, username, raiseActionAmount, table.id])

  const changeRaiseAmount = useCallback(
    (price: number, percentPot: number = 0) => {
      let raise = percentPot ? percentPot * table.total : price
      raise = Math.max(raise, raiseLimits.min)
      raise = Math.min(raise, raiseLimits.max)

      setRaise(raise)
    },
    [setRaise, table.total, raiseLimits.min, raiseLimits.max],
  )

  return { raise, raiseLimits, changeRaiseAmount, handleRaiseAction }
}
