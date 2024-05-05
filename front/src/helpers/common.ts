import { roundNumber } from './clientHelpersPoker'

import { LOCAL_STORAGE_APP_KEY } from 'src/configs/constants'
import { TypeResolve } from 'src/interfaces'

export const findInString = (string: string, value: string) => {
  if (!string || !value) return true

  return string.toLowerCase().includes(value.toLowerCase())
}

export const downloadLink = (link: string, fileName: string) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = link
  a.setAttribute('download', fileName)
  a.setAttribute('target', '_blank')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const replaceInArray = (array: string[], find: string, replace: string) => {
  const index = array.indexOf(find)

  if (index !== -1) {
    array[index] = replace
  }

  return array
}

export const sortAlphabetically = (array: string[], keyInObject: number, ordering = 'asc') => {
  const orderingNumber = ordering === 'asc' ? 1 : -1

  return array.sort((item1, item2) => {
    const value1 = item1[keyInObject]
    const value2 = item2[keyInObject]

    if (value1.match(/[1-9]/g) && !value2.match(/[1-9]/g)) {
      return 1
    }

    if (value1 < value2) {
      return -1 * orderingNumber
    }

    if (value1 > value2) {
      return 1 * orderingNumber
    }

    return 0
  })
}

export const makeUniqueArray = (initialArray: []) => {
  const arrayOfJsons = initialArray.map(value => JSON.stringify(value))

  return initialArray.filter((value, index) => arrayOfJsons.indexOf(JSON.stringify(value)) === index)
}

export const makeUniqueArrayByPropery = (initialArray: any[], property: string) => {
  const arrayOfProperty = initialArray.map(object => object[property])

  return initialArray.filter((object, index) => arrayOfProperty.indexOf(object[property]) === index)
}

export const isBoolean = (variable: boolean) => typeof variable === 'boolean'

export const isString = (variable: unknown) => typeof variable === 'string'

export const isNumber = (variable: number | string) => typeof variable === 'number'

export const isObject = (variable: object) => typeof variable === 'object'

export const isArray = (variable: []): boolean => Array.isArray(variable)

export const isUndefined = (variable: unknown) => typeof variable === 'undefined'

export const isObjectEmpty = (object: object) => !object || !isObject(object) || !Object.keys(object).length

export const isThereCommonItemsInArrays = (array1: [], array2: []) => array1.some(item => array2.includes(item))

export const getLocalstorage = <T>(key: string, defaultValue: T): T => {
  try {
    const json = localStorage.getItem(LOCAL_STORAGE_APP_KEY) || ''
    const data = JSON.parse(json) || {}

    if (isObjectEmpty(data) || isUndefined(data[key])) return defaultValue

    return data[key]
  } catch (error) {
    return defaultValue
  }
}

export const setLocalsotrage = (key: string, value: unknown): void => {
  try {
    const json = localStorage.getItem(LOCAL_STORAGE_APP_KEY) || ''
    const data = JSON.parse(json) || {}
    const newData = { ...data, [key]: value }

    localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(newData))
  } catch (error) {
    localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify({ [key]: value }))
  }
}

export const removeLocalsotrage = (key: string): void => {
  try {
    const json = localStorage.getItem(LOCAL_STORAGE_APP_KEY) || ''
    const data = JSON.parse(json) || {}
    delete data[key]

    localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(data))
  } catch (error) {
    //
  }
}

export const shortenString = (string: string, maxLength: number, ending = '...') =>
  string.length > maxLength ? `${string.slice(0, maxLength - ending.length)}${ending}` : string

export const stopPropagation = (e: Event) => e.stopPropagation()

export function debounceMethodWithAllPromises(funcx: TypeResolve, debounceTime = 500) {
  let timer: ReturnType<typeof setTimeout>
  let resolves: TypeResolve[] = []

  return (...args: string[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      const result = funcx(...args)
      resolves.forEach(r => r(result))
      resolves = []
    }, debounceTime)

    /*eslint no-promise-executor-return: "off"*/
    return new Promise(resolve => {
      resolves.push(resolve)
    })
  }
}

export function debounceMethodWithPromise(funcx: TypeResolve, debounceTime = 500) {
  let timer: ReturnType<typeof setTimeout>
  let lastResolvMethod: TypeResolve | null = null

  return (...args: string[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      const result = funcx(...args)
      // @ts-ignore
      lastResolvMethod(result)
      lastResolvMethod = null
    }, debounceTime)

    /*eslint no-promise-executor-return: "off"*/
    return new Promise(resolve => {
      lastResolvMethod = resolve
    })
  }
}

export function debounceMethod(func: TypeResolve, debounceTime = 500) {
  let timer: ReturnType<typeof setTimeout>

  return (...args: string[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args)
    }, debounceTime)
  }
}

export const renderCamelCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1 $2')

export const toFormalCase = (string?: string): string => {
  const uppercase = string ? string.charAt(0).toUpperCase() + string.slice(1) : ' '

  // @ts-ignore
  return uppercase.replaceAll('_', ' ')
}

export const toBool = (value: unknown) => !!value

export const convertNullToEmptyString = (value: unknown) => (value === null || value === undefined ? '' : value)

export const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1)
}

export const lowerize = (string: string) => {
  return string[0].toLowerCase() + string.slice(1)
}

export const playSound = (action: string) => {
  const correctAction = lowerize(action)
  const sound = document.getElementById(`${correctAction}-sound-id`) as HTMLAudioElement
  if (!sound) return

  sound.muted = false
  sound.play()
}

export const stopSound = (action: string) => {
  const correctAction = lowerize(action)
  const sound = document.getElementById(`${correctAction}-sound-id`) as HTMLAudioElement
  if (!sound) return

  sound.pause()
}

export const getMinutes = (second: number) => {
  const minutes = Math.floor(second / 60) + ''

  return minutes.padStart(2, '0')
}

export const getSeconds = (second: number) => {
  const seconds = Math.floor(second % 60) + ''

  return seconds.padStart(2, '0')
}

export const refreshBrowser = () => {
  window.location.reload()
}

export const formatInputTypeFloat = (value: string, maximum = 9999999, decimals = 2): string => {
  if (isUndefined(value)) return '0'

  if (value === '') return ''

  if (value === '.') return '0.'

  if (value.slice(-1) === '.') return value

  if (value.slice(-2) === '.0') return value

  if (!isNaN(+value)) {
    if (maximum && +value > maximum) {
      return '' + maximum
    }

    return '' + roundNumber(+value, decimals)
  }

  return '0'
}
export const getAcceptableValue = (value: string, min: number, max: number, step: number) => {
  const numberValue = +value
  if (isNaN(numberValue)) {
    return min
  }

  if (numberValue < min) {
    return min
  }

  if (numberValue < min + step && numberValue !== min) {
    return min + step
  }

  if (numberValue > max) {
    return max
  }

  return min
}
