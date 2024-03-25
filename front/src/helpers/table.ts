import { isNumber, toFormalCase } from './common'

export const calculateHeadCells = (list: any[], model = 'users') => {
  const headerCells = []
  const firstItemOfModel = list[0]

  if (firstItemOfModel) {
    Object.keys(firstItemOfModel).map(key => {
      const value = firstItemOfModel[key]
      headerCells.push({
        id: key,
        disablePadding: key === 'id',
        label: toFormalCase(key),
        numeric: isNumber(value),
      })
    })
  } else {
    headerCells.push({
      id: 'id',
      numeric: true,
      disablePadding: true,
      label: 'ID',
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
    numeric: false,
    label: 'Actions',
  })

  return headerCells
}

export const calculateBodyCells = (list: any[], model = 'users') => {
  const firstItemOfModel = list[0]
  if (firstItemOfModel) {
    return Object.keys(firstItemOfModel).map(key => {
      return {
        name: key,
      }
    })
  }

  const defaultHeaders = [
    {
      name: 'id',
    },
  ]

  if (model === 'users') {
    defaultHeaders.push({
      name: 'name',
    })
  }

  return defaultHeaders
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
