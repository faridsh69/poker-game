import { useEffect } from 'react'

import { useSocketActions } from './useSocketActions'

export const useTableCloseThenLeave = (tableId: number) => {
  const { handleLeaveTable } = useSocketActions(tableId)

  useEffect(() => {
    const onBeforeUnload = () => {
      handleLeaveTable()
    }

    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [])
}
