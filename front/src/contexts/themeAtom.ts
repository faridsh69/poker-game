import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { THEME_NAMES } from 'src/configs/theme'

const sessionJsonStorage = createJSONStorage(() => sessionStorage)
export const themeAtom = atomWithStorage('selected-theme', THEME_NAMES.light, sessionJsonStorage)
