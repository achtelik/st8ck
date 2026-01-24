<script setup lang="ts">

  import { useDisplay } from 'vuetify/framework'
  import MCard from '@/components/MCard.vue'
  import { useCardPageStore } from '@/stores/CardPageStore.ts'

  const store = useCardPageStore()
  const { data, dataIndex } = storeToRefs(store)
  const { mobile } = useDisplay()

  const finished = computed(() => {
    return data.value && data.value.data && data.value.data.length <= dataIndex.value
  })

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="data && data.data" :class="{content:true, 'content-desktop' : !mobile}">
    <m-card v-if="!finished" class="card" :data="data.data[dataIndex]!" @m-next="store.increaseDataIndex()" />
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
