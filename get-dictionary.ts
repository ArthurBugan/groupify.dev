import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  "pt-BR": () => import('./dictionaries/pt_br.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {

  if (typeof dictionaries[locale] !== 'function') {
    return dictionaries["en"]()
  }

  return dictionaries[locale]()
}