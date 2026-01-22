<script setup lang="ts">
import type {DataEntry} from '@/stores/CardPageStore.types.ts'

interface Props {
  data: DataEntry
}

const props = defineProps<Props>()
const reveal = ref(false)
</script>

<template>
  <v-card>
    <v-card-text>
      <h1>{{ data.foreign }}</h1>
      <i>{{ data.context }}</i>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="teal-accent-4"
        text="Reveal"
        variant="text"
        @click="reveal = true"
      />
    </v-card-actions>
    <v-expand-transition>
      <v-card v-if="reveal"
              class="position-absolute w-100"
              height="100%"
              style="bottom: 0;"
      >
        <v-card-text>
          <h1>{{ data.native }}</h1>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            color="teal-accent-4"
            text="Close"
            variant="text"
            @click="reveal = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<style scoped lang="sass">

</style>
