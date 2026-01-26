<script setup lang="ts">

</script>

<template>
  <div class="content">
    <v-timeline align="start">
      <v-timeline-item>
        <template #opposite>
          <div class="text-h6">Content title</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore
            magna aliqua.
          </p>
        </template>
      </v-timeline-item>

      <v-timeline-item>
        <template #opposite>
          <p>
            {{ $t('stackPathPage.availableSoonText') }}
          </p>
        </template>
      </v-timeline-item>

      <v-timeline-item>
        <template #opposite>
          <p>...</p>
        </template>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<style scoped lang="sass">
.content
  padding: 8px
</style>
