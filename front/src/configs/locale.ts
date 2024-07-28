import { initReactI18next } from 'react-i18next'

import { deDE, enUS, faIR } from '@mui/material/locale'
import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

import deFlag from 'src/images/flags/de.svg'
import enFlag from 'src/images/flags/en.svg'
import faFlag from 'src/images/flags/fa.svg'
import deTranslation from 'src/locales/de.json'
import enTranslation from 'src/locales/en.json'
import faTranslation from 'src/locales/fa.json'

export const LANGUAGES = [
  {
    title: 'en',
    label: 'English',
    muiLocal: enUS,
    translations: enTranslation,
    flag: enFlag,
    country: 'en-GB',
  },
  {
    title: 'de',
    label: 'Germany',
    muiLocal: deDE,
    translations: deTranslation,
    flag: deFlag,
    country: 'de-DE',
  },
  {
    title: 'fa',
    label: 'Persian',
    muiLocal: faIR,
    translations: faTranslation,
    flag: faFlag,
    country: 'fa-IR',
  },
]

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    resources: {
      en: {
        translation: LANGUAGES[0].translations,
      },
      de: {
        translation: LANGUAGES[1].translations,
      },
      fa: {
        translation: LANGUAGES[2].translations,
      },
    },
    fallbackLng: LANGUAGES[0].name,
    debug: false,
  })
