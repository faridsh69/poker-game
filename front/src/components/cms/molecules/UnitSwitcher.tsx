import { FormControl, MenuItem, Select } from '@mui/material'
import { useAtom } from 'jotai'

import { MONEY_UNITS } from 'src/configs/moneyUnits'
import { moneyUnitTitleAtom } from 'src/contexts/moneyUnitTitleAtom'

export const UnitSwitcher = () => {
  const [moneyUnitTitle, setMoneyUnitTitle] = useAtom(moneyUnitTitleAtom)

  const changeUnit = (title: string) => {
    setMoneyUnitTitle(title)
  }

  return (
    <FormControl size='small' className='small-dropdown'>
      <Select value={moneyUnitTitle}>
        {MONEY_UNITS.map(unit => {
          return (
            <MenuItem value={unit.title} key={unit.title} onClick={() => changeUnit(unit.title)}>
              <img src={unit.flag} alt={unit.title} className='small-dropdown-img' /> {unit.title} - {unit.label}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
