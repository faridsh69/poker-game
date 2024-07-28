import { atom } from 'jotai'

import { MONEY_UNIT_TITLES } from 'src/configs/moneyUnits'

export const moneyUnitTitleAtom = atom(MONEY_UNIT_TITLES.usd)
