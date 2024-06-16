import { atom } from 'jotai'

import { META_TAGS } from 'src/configs/constants'

export const pageTitleAtom = atom<string>(META_TAGS.title)
