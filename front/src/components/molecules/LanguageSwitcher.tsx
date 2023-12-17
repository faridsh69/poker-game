import { useTranslation } from 'react-i18next'
import { FormControl, Select, MenuItem } from '@mui/material'

import { DE_LANGUAGE, EN_LANGUAGE, FLAG_LOCALES } from 'src/configs/locale'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.resolvedLanguage === EN_LANGUAGE ? DE_LANGUAGE : EN_LANGUAGE)
  }

  return (
    <FormControl size='small' className='language-switcher'>
      <Select value={i18n.resolvedLanguage} onChange={changeLanguage}>
        {Object.keys(FLAG_LOCALES).map(locale => (
          <MenuItem value={locale} key={locale}>
            {locale.toUpperCase()}
            <img src={FLAG_LOCALES[locale]} alt={locale} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
