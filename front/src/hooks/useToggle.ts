import { useCallback, useState } from 'react'

export const useToggle = (defaultValue: boolean): [open: boolean, handleToggle: () => void] => {
  const [open, setOopen] = useState<boolean>(defaultValue)

  const handleToggle = useCallback(() => {
    setOopen(prev => !prev)
  }, [])

  return [open, handleToggle]
}
