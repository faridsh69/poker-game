import { isNumber, toFormalCase } from 'src/helpers/common'
import { TypeBodyCells, TypeHeadCells } from 'src/interfaces'

export const calculateHeadCells = (list: object[], model = 'users'): TypeHeadCells[] => {
  const headerCells: TypeHeadCells[] = []
  const firstItemOfModel = list[0]

  if (firstItemOfModel) {
    Object.keys(firstItemOfModel).map(key => {
      // @ts-ignore
      const value = firstItemOfModel[key]
      headerCells.push({
        id: key,
        label: toFormalCase(key),
        numeric: isNumber(value),
        disablePadding: key === 'id',
      })
    })
  } else {
    headerCells.push({
      id: 'id',
      label: 'ID',
      numeric: true,
      disablePadding: true,
    })
    if (model === 'users') {
      headerCells.push({
        id: 'name',
        disablePadding: false,
        numeric: false,
        label: 'Title',
      })
    }
  }

  headerCells.push({
    id: 'actions',
    label: 'Actions',
    numeric: false,
    disablePadding: false,
  })

  return headerCells
}

export const calculateBodyCells = (list: object[], model = 'users'): TypeBodyCells[] => {
  const firstItemOfModel = list[0]
  if (firstItemOfModel) {
    return Object.keys(firstItemOfModel).map(key => {
      return {
        name: key,
      }
    })
  }

  const defaultBodyCells = [
    {
      name: 'id',
    },
  ]

  if (model === 'users') {
    defaultBodyCells.push({
      name: 'name',
    })
  }

  return defaultBodyCells
}

export const stableSort = <T>(array: readonly T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export type OrderType = 'asc' | 'desc'

export const getComparator = <Key extends keyof string>(
  order: OrderType,
  orderBy: Key,
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
