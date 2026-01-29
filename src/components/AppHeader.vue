<template>
  <v-app-bar
    color="teal-darken-4"
    image="/images/background.png"
  >
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      />
    </template>

    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>-->

    <v-app-bar-title>
      <v-btn size="x-large" @click="routeOverview()">
        {{ $t('global.st8ack') }}
      </v-btn>
    </v-app-bar-title>

    <v-btn icon @click="toggleTheme">
      <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-menu>
      <template #activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props" />
      </template>

      <v-list>
        <v-list-item key="profile" :title="$t('global.profile') " value="profile" @click="routeProfile()" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'
  import { useAppStore } from '@/stores/AppStore.ts'

  const router = useRouter()
  const appStore = useAppStore()
  const theme = useTheme()

  function routeOverview () {
    router.push('/stackOverviewPage')
  }

  function routeProfile () {
    router.push('/profilePage')
  }

  function toggleTheme () {
    appStore.toggleThemeMode()
  }

</script>

<style scoped lang="sass">

</style>
