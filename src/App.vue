<template>
  <v-app>
    <router-view />

    <!-- Loading Overlay-->
    <v-overlay
      class="align-center justify-center"
      :model-value="appStore.isLoading"
      persistent
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      />
    </v-overlay>

    <!-- Messages-->
    <v-snackbar-queue v-model="appStore.messages" />
  </v-app>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app.ts'
  //
  import { useProfileStore } from '@/stores/ProfileStore.ts'

  const profileStore = useProfileStore()
  const router = useRouter()
  const appStore = useAppStore()

  onMounted(() => {
    profileStore.loadProfile()
    if (!profileStore.profile) {
      router.push('/profilePage')
    }
  })
</script>
