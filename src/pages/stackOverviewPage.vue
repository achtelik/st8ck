<script setup lang="ts">

  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify/framework'
  import { type I18nText, i18nTextByLanguage } from '@/stores/common.types.ts'
  import { useStackOverviewPageStore } from '@/stores/StackOverviewPageStore.ts'

  const router = useRouter()
  const store = useStackOverviewPageStore()
  const { mobile } = useDisplay()
  const { locale } = useI18n()

  function openStackPath (pathDataUrl: string) {
    router.push({ path: '/stackPathPage', query: { dataUrl: pathDataUrl } })
  }

  onMounted(() => {
    store.loadData()
  })
</script>

<template>
  <div v-if="store.data" :class="{content:true, 'content-desktop' : !mobile}">
    <v-card v-for="stack in store.data?.items" :key="stack.id" @click="openStackPath(stack.pathDataUrl)">
      <v-img
        class="align-end"
        cover
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3)"
        :src="stack.imageUrl"
        width="100%"
      >
        <v-card-title class="title">
          {{ i18nTextByLanguage(stack.titles, locale) }}
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
