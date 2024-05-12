import { throwException } from './http'

import { TypeUserFullData } from 'src/interfaces/types'
import { PaymentsService } from 'src/services/payments.service'
import { TransactionsService } from 'src/services/transactions.service'
import { UsersService } from 'src/services/users.service'

export const findInString = (string: string, value: string) => {
  if (!string || !value) return true

  return string.toLowerCase().includes(value.toLowerCase())
}

export const replaceInArray = (array: string[], find: string, replace: string) => {
  const index = array.indexOf(find)

  if (index !== -1) {
    array[index] = replace
  }

  return array
}

export const makeUniqueArray = (initialArray: []) => {
  const arrayOfJsons = initialArray.map(value => JSON.stringify(value))

  return initialArray.filter((value, index) => arrayOfJsons.indexOf(JSON.stringify(value)) === index)
}

export const makeUniqueArrayByPropery = (initialArray: [], property: string) => {
  const arrayOfProperty = initialArray.map(object => object[property])

  return initialArray.filter((object, index) => arrayOfProperty.indexOf(object[property]) === index)
}

export const isBoolean = (variable: boolean) => typeof variable === 'boolean'

export const isString = (variable: string) => typeof variable === 'string'

export const isNumber = (variable: number) => typeof variable === 'number'

export const isObject = (variable: object) => typeof variable === 'object'

export const isArray = (variable: []) => Array.isArray(variable)

export const isUndefined = (variable: object) => typeof variable === 'undefined'

export const isObjectEmpty = (object: object) => !object || !isObject(object) || !Object.keys(object).length

export const isThereCommonItemsInArrays = (array1: [], array2: []) => array1.some(item => array2.includes(item))

export const shortenString = (string: string, maxLength: number, ending = '...') =>
  string.length > maxLength ? `${string.slice(0, maxLength - ending.length)}${ending}` : string

export const stopPropagation = (e: Event) => e.stopPropagation()

export const renderCamelCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1 $2')

export const toFormalCase = (string?: string): string => {
  const uppercase = string ? string.charAt(0).toUpperCase() + string.slice(1) : ' '

  return uppercase.replaceAll('_', ' ')
}

export const toBool = (value: boolean) => !!value

export const convertNullToEmptyString = (value: string) => (value === null ? '' : value)

export const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1)
}

export const lowerize = (string: string) => {
  return string[0].toLowerCase() + string.slice(1)
}

export const seedData = (data: any[], repository: any) => {
  return data.map(async record => {
    return await repository
      .findOne({ where: { id: record.id } })
      .then(async (dbRecord: any) => {
        if (dbRecord) {
          return Promise.resolve(await repository.update(record.id, record))
        }

        return Promise.resolve(await repository.save(record))
      })
      .catch((error: any) => Promise.reject(error))
  })
}

export const getUserFullData = async (
  userService: UsersService,
  paymentsService: PaymentsService,
  transactionsService: TransactionsService,
  id: number,
): Promise<TypeUserFullData> => {
  const user = await userService.findOneBy('id', id)
  if (!user) {
    return throwException('The specified user id does not exists.' + id, false, 400)
  }

  const paymentSum = await paymentsService.findUserBalance(id)
  const transactionSum = await transactionsService.findUserBalance(id)
  const balance = paymentSum + transactionSum

  return { ...user, balance }
}
