import { useCallback } from 'react'
import { debounceMethod, debounceMethodWithPromise } from 'src/helpers/common'
import { TypeResolve } from 'src/interfaces'

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useDebounceMethod = (method: TypeResolve) =>
  useCallback(debounceMethod(method), [method])

export const useDebounceMethodWithPromise = (method: TypeResolve, debounceTime = 500) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(debounceMethodWithPromise(method, debounceTime), [])
