import type { StatisticsData } from '@/stores/StatisticsStore.types.ts'
// Utilities
import { defineStore } from 'pinia'

export const useStatisticsStore = defineStore('statisticsStore', () => {
  const data = ref<StatisticsData>()

  async function addEntry (entry: {
    key: string
    foreignLanguage: string
    nativeLanguage: string
    text: string
    type: 'correct' | 'wrong'
  }) {
    if (!data.value) {
      data.value = { data: [] }
    }

    const timestamp = Date.now()

    // Suche oder erstelle den Stack für den Key
    let stack = data.value.data.find(s => s.key === entry.key)
    // Create a new stack
    if (!stack) {
      const stackEntry = {
        text: entry.text,
        correctTimeline: entry.type === 'correct' ? [timestamp] : [],
        wrongTimeline: entry.type === 'wrong' ? [timestamp] : [],
      }
      stack = {
        key: entry.key,
        foreignLanguage: entry.foreignLanguage,
        nativeLanguage: entry.nativeLanguage,
        data: [stackEntry],
      }
      data.value.data.push(stack)
      return
    }

    // Suche oder erstelle den Eintrag (text)
    let stackEntry = stack.data.find(i => i.text === entry.text)
    // Create a new stackEnetry
    if (!stackEntry) {
      stackEntry = {
        text: entry.text,
        correctTimeline: [],
        wrongTimeline: [],
      }
      stack.data.push(stackEntry)
    }

    // Füge Zeitstempel zur passenden Timeline hinzu
    if (entry.type === 'correct') {
      stackEntry.correctTimeline.push(timestamp)
    } else {
      stackEntry.wrongTimeline.push(timestamp)
    }
  }

  // 3. Expose everything you want to use in components
  return {
    data,
    addEntry,
  }
})
