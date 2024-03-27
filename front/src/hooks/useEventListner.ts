import { useEffect } from 'react'

export const useEventListener = (eventName: string, action: () => void, dependencies = []) => {
  useEffect(() => {
    window.addEventListener(eventName, action)

    return () => {
      window.removeEventListener(eventName, action)
    }
  }, dependencies)
}

export const useEventListenerWithTimeout = (
  eventName: string,
  action: () => void,
  dependencies = [],
  timeout = 0,
) => {
  useEventListener(
    eventName,
    () => {
      setTimeout(() => {
        action()
      }, timeout)
    },
    dependencies,
  )
}
