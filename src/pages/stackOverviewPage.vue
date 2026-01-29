<script setup lang="ts">

  import type { StackTitle } from '@/stores/StackOverviewPageStore.types.ts'
  import { useDisplay } from 'vuetify/framework'
  import { useStackOverviewPageStore } from '@/stores/StackOverviewPageStore.ts'

  const router = useRouter()
  const store = useStackOverviewPageStore()
  const { mobile } = useDisplay()

  function openStack (pathDataUrl: string) {
    router.push('/stackPathPage')
  }

  function titleTextByCountry (titles: StackTitle[], language: string): StackTitle {
    const found = titles.find(t => (t.language ?? '').toLowerCase() === language.toLowerCase())
    if (!found) {
      throw new Error('Title not found')
    }
    return found
  }

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="store.data" :class="{content:true, 'content-desktop' : !mobile}">
    <v-card v-for="stack in store.data?.items" :key="stack.id" @click="openStack(stack.pathDataUrl)">
      <v-img
        class="align-end"
        cover
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3)"
        :src="stack.imageUrl"
        width="100%"
      >
        <v-card-title class="title">
          {{ titleTextByCountry(stack.titles, 'de').text }}
        </v-card-title>
      </v-img>
    </v-card>
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

.title
  color: #ffffff
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.7)
  font-weight: 600
</style>
