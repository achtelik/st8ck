<script setup lang="ts">
  import type { DataEntry } from '@/stores/CardPageStore.types.ts'
  import { useDisplay } from 'vuetify/framework'

  interface Props {
    data: DataEntry
  }

  const props = defineProps<Props>()

  const { mobile, name } = useDisplay()

  const reveal = ref(false)
  const input = ref<string>()

  // Watch for changes in props.data and reset reveal
  watch(() => props.data, () => {
    reveal.value = false
  })

  const emit = defineEmits(['m-next'])

  function triggerReveal () {
    reveal.value = true
  }

  function triggerNext () {
    reveal.value = false
    input.value = undefined
    emit('m-next')
  }

  function speakForeignText () {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(props.data.foreign)
      // Set the language for the speech.
      // Based on your data example (fr/en-basics.json), the foreign language appears to be French.
      // You might want to make this dynamic if your app supports multiple foreign languages.
      utterance.lang = 'de-DE' // Example: Set language to French
      window.speechSynthesis.speak(utterance)
    } else {
      console.warn('Speech Synthesis API not supported in this browser.')
      // Optionally, you can provide a user-friendly message or fallback here.
      alert('Your browser does not support text-to-speech functionality.')
    }
  }
</script>

<template>
  <v-card>
    <v-card-text>
      <h1>{{ data.foreign }}</h1>
      <v-btn icon variant="text" @click="speakForeignText">
        <v-icon>mdi-volume-high</v-icon>
      </v-btn>
      <i>{{ data.context }}</i>
      <v-text-field v-model="input" label="Your solution" />
      <h1>{{ reveal ? data.native : '&nbsp;' }}</h1>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!mobile && !reveal"
        class="w-100"
        color="teal-accent-4"
        text="Reveal"
        variant="outlined"
        @click="triggerReveal()"
      />
      <v-btn
        v-if="!mobile && reveal"
        class="w-100"
        color="teal-accent-4"
        text="Next"
        variant="tonal"
        @click="triggerNext()"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="sass">

</style>
