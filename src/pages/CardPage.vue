<script setup lang="ts">

  import MCard from '@/components/MCard.vue'
  import { useCardPageStore } from '@/stores/CardPageStore.ts'

  const store = useCardPageStore()
  const { data, dataIndex } = storeToRefs(store)

  const finished = computed(() => {
    return data.value && data.value.data && data.value.data.length <= dataIndex.value
  })

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="data && data.data" class="content">
    <m-card class="card" v-if="!finished" :data="data.data[dataIndex]!" @m-next="store.increaseDataIndex()" />

    <div class="actions">
      <v-btn
        class="w-100"
        color="teal-accent-4"
        text="Reveal"
        variant="outlined"
        @click=""
      />
      <v-btn
        v-if="false"
        class="w-100"
        color="teal-accent-4"
        text="Next"
        variant="tonal"
        @click=""
      />
    </div>
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
  align-items: center
  padding: 0px 8px

.card
  margin-top: auto
  width: 100%

.actions
  margin-top: auto
  width: 100%
</style>
