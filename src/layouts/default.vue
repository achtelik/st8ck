<template>
  <v-main class="main">
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
//
</script>

<style scoped lang="sass">
.main
  margin: 0 auto
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  max-width: 800px
  width: 100%
</style>
