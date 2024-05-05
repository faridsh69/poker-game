import { useTranslation } from 'react-i18next'

import { FormControl, MenuItem, Select } from '@mui/material'

import { FLAG_LOCALES, LANGUAGES } from 'src/configs/locale'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.resolvedLanguage === LANGUAGES.en ? LANGUAGES.de : LANGUAGES.en)
  }

  return (
    <FormControl size='small' className='language-switcher'>
      <Select value={i18n.resolvedLanguage} onChange={changeLanguage}>
        {Object.keys(FLAG_LOCALES).map(locale => (
          <MenuItem value={locale} key={locale}>
            {locale.toUpperCase()}
            <img src={FLAG_LOCALES[locale as keyof typeof FLAG_LOCALES]} alt={locale} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
