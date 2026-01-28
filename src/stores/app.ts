// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref<boolean>(false)
  const messages = ref<{
    text: string
    timeout: number
    color: string
  }[]>([])

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

  function pushMessage (text: string, color = 'green') {
    messages.value.push({ text, timeout: 2000, color })
  }

  return {
    isLoading,
    messages,
    executeLoading,
    pushMessage,
  }
})
