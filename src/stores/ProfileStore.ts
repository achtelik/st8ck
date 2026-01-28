import type { Profile } from '@/stores/ProfileStore.types.ts'
import { defineStore } from 'pinia'

export const PROFILE_STORAGE_KEY = 'profile'
export const useProfileStore = defineStore('profileStore', () => {
  // 1. State: Use ref() and provide your default value immediately
  const profile = ref<Profile | null>()

  // 2. Actions: Just regular functions
  function saveProfile (newProfile: Profile) {
    profile.value = newProfile
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile))
    } catch (error) {
      // Fehler beim Schreiben in localStorage ignorieren

      console.warn('Could not save profile to localStorage', error)
    }
  }

  function loadProfile () {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) {
      profile.value = null
      return
    }
    try {
      profile.value = JSON.parse(raw) as Profile
    } catch {
      profile.value = null
    }
  }

  // 3. Expose everything you want to use in components
  return {
    profile,
    saveProfile,
    loadProfile,
  }
})
