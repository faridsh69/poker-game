import { useEffect } from 'react'

import { useSocketActions } from './useSocketActions'

export const useTableCloseThenLeave = (tableId: number) => {
  const { handleLeaveTable, handleJoinTable } = useSocketActions(tableId)

  useEffect(() => {
    handleJoinTable(tableId)

    const onBeforeUnload = () => {
      handleLeaveTable()
    }

    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [])
}
