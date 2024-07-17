import { useEffect } from 'react'

export const useBodyClassname = (className: string) => {
  useEffect(() => {
    document.body.className = className
  }, [])
}
