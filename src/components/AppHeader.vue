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

    <!--<v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>-->
  </v-app-bar>
</template>

<script setup lang="ts">

  const router = useRouter()

  function routeOverview () {
    router.push('/stackOverviewPage')
  }

</script>

<style scoped lang="sass">

</style>
