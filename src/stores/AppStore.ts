import type { AppStoreDTO, ThemeMode } from '@/stores/AppStore.types.ts'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const STORAGE_KEY = 'app'
  const isLoading = ref<boolean>(false)
  const themeMode = ref<ThemeMode>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const messages = ref<{
    text: string
    timeout: number
    color: string
  }[]>([])

  function saveStore () {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ themeMode: themeMode.value } as AppStoreDTO))
    } catch (error) {
      console.warn('Could not save profile to localStorage', error)
    }
  }

  function loadStore () {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return
    }
    try {
      const appStoreDTO = JSON.parse(raw) as AppStoreDTO
      themeMode.value = appStoreDTO.themeMode
    } catch {
      console.log('Could not load AppStore.')
    }
  }

  async function executeLoading<T> (action: () => Promise<T> | void, minMs = 200) {
    isLoading.value = true
    const start = Date.now()
    try {
      return await action()
    } finally {
      const elapsed = Date.now() - start
      if (elapsed < minMs) {
        await new Promise(resolve => setTimeout(resolve, minMs - elapsed))
      }
      isLoading.value = false
    }
  }

  function toggleThemeMode () {
    themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
    saveStore()
  }

  function pushMessage (text: string, color = 'green') {
    messages.value.push({ text, timeout: 2000, color })
  }

  return {
    isLoading,
    themeMode,
    messages,
    executeLoading,
    toggleThemeMode,
    pushMessage,
    loadStore,
  }
})
