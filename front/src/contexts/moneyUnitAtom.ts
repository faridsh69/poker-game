import { atom } from 'jotai'

import { MONEY_UNITS } from 'src/configs/moneyUnits'

export const moneyUnitAtom = atom(MONEY_UNITS.toman)
