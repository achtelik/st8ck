<script setup lang="ts">
  import type { StackItem } from '@/stores/CardPageStore.types.ts'
  import { i18nTextByLanguage } from '@/stores/common.types.ts'

  interface Props {
    playAudioOnStart: boolean
    foreignLanguage: string
    nativeLanguage: string
    audioRootUrl: string
    data: StackItem
  }

  const props = defineProps<Props>()

  const reveal = ref(false)
  const input = ref<string>()
  const swapped = ref<boolean>(false)

  // Watch for changes in props.data and reset reveal
  watch(() => props.data, () => {
    reveal.value = false
    if (props.playAudioOnStart && !swapped.value) {
      playAudio()
    }
  })

  const emit = defineEmits<{
    (e: 'm-swap'): void
    (e: 'm-correct' | 'm-wrong', text: string): void
    (e: 'm-play-audio-on-start-toggle', value: boolean): void
  }>()

  function triggerReveal () {
    reveal.value = true
    if (swapped.value) {
      playAudio()
    }
  }

  function triggerCorrect () {
    reveal.value = false
    input.value = undefined
    emit('m-correct', props.data.foreign)
  }

  function triggerWrong () {
    reveal.value = false
    input.value = undefined
    emit('m-wrong', props.data.foreign)
  }

  function triggerSwap () {
    swapped.value = !swapped.value
    emit('m-swap')
  }

  function triggerPlayAudioOnStartToggle () {
    emit('m-play-audio-on-start-toggle', !props.playAudioOnStart)
  }

  function playAudio () {
    new Audio(`${props.audioRootUrl}/${props.data.audio}`).play().catch(error => {
      console.log('Wiedergabe verhindert: Nutzerinteraktion erforderlich!', error)
    })
  }

</script>

<template>
  <v-card>
    <v-card-text>
      <div class="topHeaderArea">
        <v-btn disabled icon variant="text" />
        <p class="text-center">{{ $t(`global.languages.${foreignLanguage}`) }}</p>
        <v-menu>
          <template #activator="{ props: activatorProps }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="activatorProps" />
          </template>

          <v-list>
            <v-list-item>
              <v-switch
                color="purple"
                hide-details
                :label="$t(`global.playAudioAutomatically`)"
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
          :label="$t(`global.yourSolution`)"
          name="no-autofill"
          spellcheck="false"
          variant="underlined"
        />
        <v-btn icon variant="text" @click="triggerSwap()">
          <v-icon>mdi-swap-vertical</v-icon>
        </v-btn>
      </div>
      <p class="text">{{ $t(`global.languages.${nativeLanguage}`) }}</p>
      <h1 class="text-center">{{ reveal || swapped ? i18nTextByLanguage(data.native, nativeLanguage) : '&nbsp;' }}</h1>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if=" !reveal"
        class="cardAction"
        color="teal-accent-4"
        :text="$t(`global.uncover`)"
        variant="outlined"
        @click="triggerReveal()"
      />
      <v-btn
        v-if="reveal"
        class="cardAction"
        color="green-accent-4"
        :text="$t(`global.correct`)"
        variant="tonal"
        @click="triggerCorrect()"
      />
      <v-btn
        v-if="reveal"
        class="cardAction"
        color="red-accent-4"
        :text="$t(`global.wrong`)"
        variant="tonal"
        @click="triggerWrong()"
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
