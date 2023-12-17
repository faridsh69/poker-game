import { atom } from 'jotai'
import { TypeBuyinModalComponent } from 'src/interfaces'

export const buyinModalAtom = atom<TypeBuyinModalComponent>({ show: false })
