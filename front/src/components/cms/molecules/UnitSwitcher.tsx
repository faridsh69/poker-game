import { FormControl, MenuItem, Select } from '@mui/material'
import { useAtom } from 'jotai'

import { MONEY_UNITS } from 'src/configs/moneyUnits'
import { moneyUnitAtom } from 'src/contexts/moneyUnitAtom'

export const UnitSwitcher = () => {
  const [unit, setUnit] = useAtom(moneyUnitAtom)

  const changeUnit = (moneyUnit: string) => {
    setUnit(moneyUnit)
  }

  return (
    <FormControl size='small' className='language-switcher'>
      <Select value={unit}>
        {Object.keys(MONEY_UNITS).map(moneyUnit => (
          <MenuItem value={moneyUnit} key={moneyUnit} onClick={() => changeUnit(moneyUnit)}>
            {moneyUnit.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
