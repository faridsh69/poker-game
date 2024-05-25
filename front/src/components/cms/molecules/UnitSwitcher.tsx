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
    <FormControl size='small' className='unit-switcher'>
      <Select value={moneyUnitTitle}>
        {MONEY_UNITS.map(unit => {
          const { title, flag, name } = unit

          return (
            <MenuItem value={title} key={title} onClick={() => changeUnit(title)}>
              <img src={flag} alt={title} className='unit-switcher-img' /> {title} - {name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
