import type { StatisticsData } from '@/stores/StatisticsStore.types.ts'
// Utilities
import { defineStore } from 'pinia'

export const useStatisticsStore = defineStore('statisticsStore', () => {
  // 1. State: Use ref() and provide your default value immediately
  const data = ref<StatisticsData>()

  // 2. Actions: Just regular functions
  async function addEntry () {}

  // 3. Expose everything you want to use in components
  return {
    data,
    addEntry,
  }
})
