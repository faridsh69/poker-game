import { useCallback } from 'react'
import { debounceMethod, debounceMethodWithPromise } from 'src/helpers/common'
import { TypeResolve } from 'src/interfaces'

export const useDebounceMethod = (method: TypeResolve) =>
  useCallback(debounceMethod(method), [method])

export const useDebounceMethodWithPromise = (method: TypeResolve, debounceTime = 500) =>
  useCallback(debounceMethodWithPromise(method, debounceTime), [])
