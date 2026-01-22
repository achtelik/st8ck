<script setup lang="ts">

  import MCard from '@/components/MCard.vue'
  import { useCardPageStore } from '@/stores/CardPageStore.ts'

  const store = useCardPageStore()
  const data = computed(() => store.data)

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="data && data.data">
    CardPage
    <m-card v-if="data.data[0]" :data="data.data[0]" />
  </div>
</template>

<style scoped lang="sass">

</style>
