import { useCallback, useState } from 'react'

export const useToggle = (defaultValue: boolean): [open: boolean, handleToggle: () => void] => {
  const [isOpen, setOopen] = useState<boolean>(defaultValue)

  const handleToggle = useCallback(() => {
    setOopen(prev => !prev)
  }, [])

  return [isOpen, handleToggle]
}
