import type { StackOverview } from '@/stores/StackOverviewPageStore.types.ts'
// Utilities
import { defineStore } from 'pinia'

export const useStackOverviewPageStore = defineStore('stackOverviewPageStore', () => {
  // 1. State: Use ref() and provide your default value immediately
  const data = ref<StackOverview>()
  const isLoading = ref(false)
  const error = ref<string | null>()

  // 2. Actions: Just regular functions
  async function loadData () {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/data/stack-overview.json')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      data.value = await response.json()
    } catch (error_) {
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
