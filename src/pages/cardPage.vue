<script setup lang="ts">

  import { useDisplay } from 'vuetify/framework'
  import MCard from '@/components/MCard.vue'
  import { useCardPageStore } from '@/stores/CardPageStore.ts'
  import { useStatisticsStore } from '@/stores/StatisticsStore.ts'

  const store = useCardPageStore()
  const statisticsStore = useStatisticsStore()
  const { data, dataIndex } = storeToRefs(store)
  const { mobile } = useDisplay()

  const playAudioOnStart = ref<boolean>(true)

  const dataEntry = computed(() => {
    if (!data.value?.data) return undefined
    return data.value.data[dataIndex.value]!
  })
  const finished = computed(() => {
    if (!data.value?.data) return undefined
    return data.value && data.value.data && data.value.data.length <= dataIndex.value
  })

  function triggerCorrect (text: string) {
    const tmpEntry = dataEntry.value!
    statisticsStore.addEntry({
      key: data!.value!.key,
      foreignLanguage: tmpEntry.foreign,
      nativeLanguage: tmpEntry.native,
      text: text,
      type: 'wrong',
    })
    store.increaseDataIndex()
  }

  function triggerWrong (text: string) {
    const tmpEntry = dataEntry.value!
    statisticsStore.addEntry({
      key: data!.value!.key,
      foreignLanguage: tmpEntry.foreign,
      nativeLanguage: tmpEntry.native,
      text: text,
      type: 'wrong',
    })
    store.increaseDataIndex()
  }

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="dataEntry" :class="{content:true, 'content-desktop' : !mobile}">
    <m-card
      v-if="!finished"
      class="card"
      :data="dataEntry"
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
