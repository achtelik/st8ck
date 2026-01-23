import type { Data } from '@/stores/CardPageStore.types.ts'
// Utilities
import { defineStore } from 'pinia'

export const useCardPageStore = defineStore('cardPage', () => {
  // 1. State: Use ref() and provide your default value immediately
  const data = ref<Data>()
  const dataIndex = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>()

  // 2. Actions: Just regular functions
  async function loadData () {
    dataIndex.value = 0
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/data/fr/en-basics.json')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const jsonData: Data = await response.json()
      data.value = jsonData
    } catch (error_) {
      error.value = error_ instanceof Error ? error_.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  async function increaseDataIndex () {
    dataIndex.value++
  }

  // 3. Expose everything you want to use in components
  return {
    data,
    dataIndex,
    isLoading,
    error,
    loadData,
    increaseDataIndex,
  }
})
