import { initReactI18next } from 'react-i18next'

import { deDE, enUS } from '@mui/material/locale'
import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

import deFlag from 'src/images/flags/de.png'
import enFlag from 'src/images/flags/us.png'
import deLocales from 'src/locales/de.json'
import enLocales from 'src/locales/en.json'

export const LANGUAGES = {
  en: 'en',
  de: 'de',
}

export const MUI_LOCALES = {
  [LANGUAGES.en]: enUS,
  [LANGUAGES.de]: deDE,
}

export const FLAG_LOCALES = {
  [LANGUAGES.en]: enFlag,
  [LANGUAGES.de]: deFlag,
}

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    resources: {
      en: {
        translation: enLocales,
      },
      de: {
        translation: deLocales,
      },
    },
    fallbackLng: LANGUAGES.en,
    debug: false,
  })

// en-US
