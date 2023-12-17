import { atom } from 'jotai'

import { TypeConfirmModalComponent } from 'src/interfaces'

export const confirmModalAtom = atom<TypeConfirmModalComponent>({ show: false })
