import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { en } from './locales/en/common'

export interface Locales {
  [key: string]: any
}
const locales: Locales = { en }

const resources = {
  en: {
    translation: locales.en,
  },
}

export const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    keySeparator: '.',
  })

for (const lng of LANGUAGES) {
  i18n.addResourceBundle(lng.code, 'translation', locales[lng.code])
}

export default i18n
