import { useTranslation } from 'react-i18next'

import { FormControl, MenuItem, Select } from '@mui/material'

import { LANGUAGES } from 'src/configs/locale'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (languageTitle: string) => {
    i18n.changeLanguage(languageTitle)
  }

  return (
    <FormControl size='small' className='small-dropdown'>
      <Select value={i18n.resolvedLanguage}>
        {LANGUAGES.map(language => (
          <MenuItem value={language.title} key={language.title} onClick={() => changeLanguage(language.title)}>
            <img src={language.flag} alt={language.label} className='small-dropdown-img' />
            {language.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
