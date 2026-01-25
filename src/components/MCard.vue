<script setup lang="ts">
  import type { DataEntry } from '@/stores/CardPageStore.types.ts'
  import MDivider from '@/components/MDivider.vue'

  interface Props {
    playAudioOnStart: boolean
    data: DataEntry
  }

  const props = defineProps<Props>()

  const reveal = ref(false)
  const input = ref<string>()
  const swapped = ref<boolean>(false)

  // Watch for changes in props.data and reset reveal
  watch(() => props.data, () => {
    reveal.value = false
    if (props.playAudioOnStart) {
      playAudio()
    }
  })

  const emit = defineEmits<{
    (e: 'm-next' | 'm-swap'): void
    (e: 'm-play-audio-on-start-toggle', value: boolean): void
  }>()

  function triggerReveal () {
    reveal.value = true
  }

  function triggerNext () {
    reveal.value = false
    input.value = undefined
    emit('m-next')
  }

  function triggerSwap () {
    swapped.value = !swapped.value
    emit('m-swap')
  }

  function triggerPlayAudioOnStartToggle () {
    emit('m-play-audio-on-start-toggle', !props.playAudioOnStart)
  }

  function playAudio () {
    new Audio(`data/fr/audio/${props.data.audio}`).play().catch(error => {
      console.log('Wiedergabe verhindert: Nutzerinteraktion erforderlich!', error)
    })
  }
</script>

<template>
  <v-card>
    <v-card-text>
      <div class="topHeaderArea">
        <v-btn disabled icon variant="text" />
        <p class="text-center">France</p>
        <v-menu>
          <template #activator="{ props: activatorProps }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="activatorProps" />
          </template>

          <v-list>
            <v-list-item>
              <v-switch
                color="purple"
                hide-details
                label="Play audio on start"
                :model-value="playAudioOnStart"
                @update:model-value="triggerPlayAudioOnStartToggle()"
              />
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <h1 class="text">{{ reveal || !swapped ? data.foreign : '&nbsp;' }}</h1>
      <div class="topActions">
        <v-btn icon variant="text" @click="playAudio">
          <v-icon>mdi-volume-high</v-icon>
        </v-btn>

      </div>
      <div class="middleArea">
        <v-btn disabled icon variant="text" />
        <v-text-field
          v-model="input"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          class="centered-input"
          color="primary"
          inputmode="text"
          label="Your solution"
          name="no-autofill"
          spellcheck="false"
          variant="underlined"
        />
        <v-btn icon variant="text" @click="triggerSwap()">
          <v-icon>mdi-swap-vertical</v-icon>
        </v-btn>
      </div>
      <p class="text">English</p>
      <h1 class="text-center">{{ reveal || swapped ? data.native : '&nbsp;' }}</h1>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if=" !reveal"
        class="cardAction"
        color="teal-accent-4"
        text="Reveal"
        variant="outlined"
        @click="triggerReveal()"
      />
      <v-btn
        v-if="reveal"
        class="cardAction"
        color="green-accent-4"
        text="Correct"
        variant="tonal"
        @click="triggerNext()"
      />
      <v-btn
        v-if="reveal"
        class="cardAction"
        color="red-accent-4"
        text="Wrong"
        variant="tonal"
        @click="triggerNext()"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="sass">
.topHeaderArea
  display: flex
  align-items: center
  justify-content: space-between

.topActions
  display: flex
  justify-content: center

.middleArea
  display: flex
  align-items: center

.centered-input :deep(.v-field__field)
  justify-content: center

.centered-input :deep(.v-field__outline)
  justify-content: center

.centered-input :deep(input)
  text-align: center

.text
  padding: 8px 0
  text-align: center

.cardAction
  flex: 1 1 auto
</style>
