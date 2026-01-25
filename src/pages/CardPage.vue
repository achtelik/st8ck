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

  const finished = computed(() => {
    return data.value && data.value.data && data.value.data.length <= dataIndex.value
  })

  function triggerCorrect (key: string) {
    store.increaseDataIndex()
    statisticsStore.addEntry()
    console.log(key)
  }

  function triggerWrong (key: string) {
    store.increaseDataIndex()
    statisticsStore.addEntry()
    console.log(key)
  }

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="data && data.data" :class="{content:true, 'content-desktop' : !mobile}">
    <m-card
      v-if="!finished"
      class="card"
      :data="data.data[dataIndex]!"
      :play-audio-on-start="playAudioOnStart"
      @m-correct="event => triggerCorrect(event)"
      @m-play-audio-on-start-toggle="playAudioOnStart = !playAudioOnStart"
      @m-wrong="event => triggerWrong(event)"
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
