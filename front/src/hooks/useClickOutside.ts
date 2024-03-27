import { useCallback, useEffect, useRef, useState } from 'react'

export const useClickOutside = () => {
  const [openBox, setOpenBox] = useState(false)

  const dropdownBlockRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(({ target }: Event) => {
    if (dropdownBlockRef.current && dropdownBlockRef.current.contains(target as Node)) return

    setOpenBox(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  const handleToggleOpenBox = useCallback(() => {
    setOpenBox(prev => !prev)
  }, [])

  return [dropdownBlockRef, openBox, handleToggleOpenBox]
}
