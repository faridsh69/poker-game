import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { toFormalCase } from 'src/helpers/common'
import { TypeOrder, TypeBodyCells, TypeHeadCells } from 'src/interfaces'

export const calculateHeadCells = (list: object[], model = 'users'): TypeHeadCells[] => {
  const headerCells: TypeHeadCells[] = []
  const firstItemOfModel = list[0]

  if (firstItemOfModel) {
    Object.keys(firstItemOfModel).map(key => {
      if (key === 'deleted_at') return

      headerCells.push({
        id: key,
        label: toFormalCase(key),
        numeric: false,
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
    return Object.keys(firstItemOfModel)
      .filter(key => key !== 'deleted_at')
      .map(key => {
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

export const getComparator = <Key extends keyof string>(
  order: TypeOrder,
  orderBy: Key,
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const filterTableHeaderCells = (
  headCells: TypeHeadCells[],
  model = MODEL_FORMS_NAMES.deposit,
): TypeHeadCells[] => {
  if (model === MODEL_FORMS_NAMES.deposit || MODEL_FORMS_NAMES.withdraw) {
    return headCells.filter(
      header =>
        header.label !== 'User id' && header.label !== 'User giving' && header.id !== 'actions',
    )
  }

  return headCells
}

export const filterTableBodyCells = (
  bodyCells: TypeBodyCells[],
  model = MODEL_FORMS_NAMES.deposit,
): TypeBodyCells[] => {
  if (model === MODEL_FORMS_NAMES.deposit || MODEL_FORMS_NAMES.withdraw) {
    return bodyCells.filter(body => body.name !== 'user_id' && body.name !== 'user_giving')
  }

  return bodyCells
}
