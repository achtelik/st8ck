import type { Profile } from '@/stores/ProfileStore.types.ts'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
import { createI18n } from 'vue-i18n'
import de from '@/assets/i18n/de.json'
import en from '@/assets/i18n/en.json'
import { PROFILE_STORAGE_KEY } from '@/stores/ProfileStore.ts'

type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], string>({
  legacy: false, // you must set `false`, to use Composition API
  locale: detectBrowserLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  },
})

export default i18n

function getSavedLocale (): string | null {
  try {
    const raw = typeof window === 'undefined' ? null : window.localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) {
      return null
    }
    return (JSON.parse(raw) as Profile).language
  } catch {
    /* ignore */
  }
  return null
}

function detectBrowserLocale (): string {
  const saved = getSavedLocale()
  if (saved) {
    return saved
  }

  if (typeof navigator !== 'undefined') {
    const candidates = navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language]

    for (const raw of candidates) {
      if (!raw) {
        continue
      }
      const code = raw.toLowerCase().split(/[-_]/)[0]
      if (code === 'de') {
        return 'de'
      }
      if (code === 'en') {
        return 'en'
      }
    }
  }

  return 'en'
}
