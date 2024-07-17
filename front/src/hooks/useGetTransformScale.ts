import { useMemo } from 'react'

import { useWindowWidth } from './useWindowWidth'

export const useGetTransformScale = (minWidth: number, minHeight: number) => {
  const { width, height } = useWindowWidth()

  const style = useMemo(() => {
    const scaleBasedOnWidth = width > minWidth ? 1 : width / minWidth
    const scaleBasedOnHeight = height > minHeight ? 1 : height / minHeight

    const scale = Math.min(scaleBasedOnWidth, scaleBasedOnHeight)

    return { transform: `scale(${scale})` }
  }, [width, height])

  return style
}
