import { atom } from 'jotai'

import { MONEY_UNITS } from 'src/configs/moneyUnits'

export const moneyUnitTitleAtom = atom(MONEY_UNITS[0].title)
