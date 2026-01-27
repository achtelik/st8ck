// Utilities
import { defineStore } from 'pinia'
import BrowserUtils from '@/utils/BrowserUtils.ts'

export const useAppStore = defineStore('app', () => {
  const languageCode = ref(BrowserUtils.detectBrowserLanguage())

  return {
    languageCode,
  }
})
