import type { StackPath } from '@/stores/StackPathPageStore.types.ts'
import { defineStore } from 'pinia'

export const useStackPathPageStore = defineStore('stackPathPageStore', () => {
  // 1. State: Use ref() and provide your default value immediately
  const data = ref<StackPath>()
  const isLoading = ref(false)
  const error = ref<string | null>()

  // 2. Actions: Just regular functions
  async function loadData (stackPathUrl: string) {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(stackPathUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      data.value = await response.json()
    } catch (error_) {
      data.value = undefined
      error.value = error_ instanceof Error ? error_.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  // 3. Expose everything you want to use in components
  return {
    data,
    isLoading,
    error,
    loadData,
  }
})
