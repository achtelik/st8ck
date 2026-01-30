<script setup lang="ts">

  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify/framework'
  import { i18nTextByLanguage } from '@/stores/common.types.ts'
  import { useStackPathPageStore } from '@/stores/StackPathPageStore.ts'

  const { mobile } = useDisplay()
  const stackPathPageStore = useStackPathPageStore()
  const route = useRoute()
  const { locale } = useI18n()
  const router = useRouter()

  watch(() => route.query, query => {
    if (query.dataUrl) stackPathPageStore.loadData(query.dataUrl.toString())
  })

  onMounted(() => {
    if (route.query.dataUrl) stackPathPageStore.loadData(route.query.dataUrl.toString())
  })

  function openStack (stackDataUrl: string) {
    router.push({ path: '/cardPage', query: { dataUrl: stackDataUrl } })
  }

</script>

<template>
  <div v-if="stackPathPageStore.data" :class="{content:true, 'content-desktop' : !mobile}">
    <h1 class="title">{{ i18nTextByLanguage(stackPathPageStore.data.title, locale) }}</h1>
    <v-timeline align="start">
      <v-timeline-item v-for="item in stackPathPageStore.data?.items" :key="item.id">
        <template #opposite>
          <div v-ripple class="timelineEntry" @click="openStack(item.dataUrl)">
            <div class="text-h6">{{ i18nTextByLanguage(item.title, locale) }}</div>
            <p>{{ i18nTextByLanguage(item.description, locale) }}</p>
          </div>
        </template>
      </v-timeline-item>

      <v-timeline-item>
        <template #opposite>
          <p>
            {{ $t('stackPathPage.availableSoonText') }}
          </p>
        </template>
      </v-timeline-item>

      <v-timeline-item>
        <template #opposite>
          <p>...</p>
        </template>
      </v-timeline-item>
    </v-timeline>
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
  text-align: center

.timelineEntry
  cursor: pointer
</style>
