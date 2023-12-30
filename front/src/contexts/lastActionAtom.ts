import { atom } from 'jotai'
import { TypeLastAction } from 'src/interfaces'

export const lastActionAtom = atom<TypeLastAction>(null)
