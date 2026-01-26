// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
import { createI18n } from 'vue-i18n'
import de from '@/assets/i18n/de.json'
import en from '@/assets/i18n/en.json'

type MessageSchema = typeof en

export default createI18n<[MessageSchema], 'en' | 'de'>({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  },
})
