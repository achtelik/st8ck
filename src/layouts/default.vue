<template>
  <v-main :class="{main: true, 'main-desktop': !mobile}">
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>

  import { useDisplay } from 'vuetify/framework'

  const { mobile } = useDisplay()

</script>

<style scoped lang="sass">
.main
  margin: 0 auto
  display: flex
  justify-content: center
  align-items: center
  max-width: 800px
  width: 100%

.main-desktop
  min-height: 100vh
</style>
