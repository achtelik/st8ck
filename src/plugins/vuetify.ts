/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import { type I18n, useI18n } from 'vue-i18n'
// Composables
import { createVuetify } from 'vuetify'

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import i18n from '@/plugins/i18n.ts'
// Translations provided by Vuetify
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n: i18n as unknown as I18n<any, any, any, string, false>, useI18n }),
  },
})
