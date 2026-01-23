<script setup lang="ts">

  import MCard from '@/components/MCard.vue'
  import { useCardPageStore } from '@/stores/CardPageStore.ts'

  const store = useCardPageStore()
  const { data, dataIndex } = storeToRefs(store)

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="data && data.data">
    CardPage
    <m-card :data="data.data[dataIndex]!" @m-next="store.increaseDataIndex()" />
  </div>
</template>

<style scoped lang="sass">

</style>
