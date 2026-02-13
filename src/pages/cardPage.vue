<script setup lang="ts">

  import type { LocationQuery } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify/framework'
  import MCard from '@/components/MCard.vue'
  import { useCardPageStore } from '@/stores/CardPageStore.ts'
  import { useStatisticsStore } from '@/stores/StatisticsStore.ts'

  const store = useCardPageStore()
  const statisticsStore = useStatisticsStore()
  const { data, dataIndex } = storeToRefs(store)
  const { mobile } = useDisplay()
  const route = useRoute()
  const { locale } = useI18n()

  const playAudioOnStart = ref<boolean>(true)

  const dataEntry = computed(() => {
    if (!data.value?.items) return undefined
    return data.value.items[dataIndex.value]!
  })
  const finished = computed(() => {
    if (!data.value?.items) return undefined
    return data.value && data.value.items && data.value.items.length <= dataIndex.value
  })

  function triggerCorrect (text: string) {
    const tmpEntry = dataEntry.value!
    /* statisticsStore.addEntry({
      key: data!.value!.key,
      foreignLanguage: tmpEntry.foreign,
      nativeLanguage: tmpEntry.native,
      text: text,
      type: 'wrong',
    }) */
    store.increaseDataIndex()
  }

  function triggerWrong (text: string) {
    const tmpEntry = dataEntry.value!
    /* statisticsStore.addEntry({
      key: data!.value!.key,
      foreignLanguage: tmpEntry.foreign,
      text: text,
      type: 'wrong',
    }) */
    store.increaseDataIndex()
  }

  function handleQueryUpdate (query: LocationQuery) {
    if (query.dataUrl) store.loadData(query.dataUrl.toString())
  }

  watch(() => route.query, query => {
    handleQueryUpdate(query)
  })

  onMounted(() => {
    handleQueryUpdate(route.query)
  })
</script>

<template>
  <div v-if="data && dataEntry" :class="{content:true, 'content-desktop' : !mobile}">
    <m-card
      v-if="!finished"
      :audio-root-url="data.audioUrl"
      class="card"
      :data="dataEntry"
      :foreign-language="data?.foreignLanguage"
      :native-language="locale"
      :play-audio-on-start="playAudioOnStart"
      @m-correct="text => triggerCorrect(text)"
      @m-play-audio-on-start-toggle="playAudioOnStart = !playAudioOnStart"
      @m-wrong="text => triggerWrong(text)"
    />
    <template v-if="finished">
      Finished
    </template>
  </div>
</template>

<style scoped lang="sass">
.content
  display: flex
  flex-direction: column
  height: 100%
  width: 100%
  padding: 8px

.content-desktop
  justify-content: center

.card
  //margin-top: auto
  width: 100%

.actions
  margin-top: auto
  width: 100%
</style>
