import { atom } from 'jotai'

import { TypeTable } from 'src/interfaces'

export const allTablesAtom = atom<TypeTable[]>([])
