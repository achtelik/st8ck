<template>
  <v-app-bar
    color="teal-darken-4"
    image="/images/background.png"
  >
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      />
    </template>

    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>-->

    <v-app-bar-title>
      <v-btn size="x-large" @click="routeOverview()">
        {{ $t('global.st8ack') }}
      </v-btn>
    </v-app-bar-title>

    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="text">
          <img class="languageImage" :src="`/images/flags/${locale}.png`" width="24">
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in languages"
          :key="index"
          :value="index"
          @click="changeLanguage(item.code)"
        >
          <div class="languageItem">
            <img class="languageImage" :src="`/images/flags/${item.code}.png`" width="24">
            <div :class="{'text-primary': item.code == locale}">{{ item.label }}</div>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>

    <!--<v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>-->
  </v-app-bar>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {setLocale} from '@/plugins/i18n.ts'

const router = useRouter()
const {locale, t} = useI18n()

const languages = [
  {code: 'de', label: t('global.languages.de')},
  {code: 'en', label: t('global.languages.en')},
]

function routeOverview() {
  router.push('/stackOverviewPage')
}

function changeLanguage(code: string) {
  setLocale(code)
}

</script>

<style scoped lang="sass">
.languageImage
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25)

.languageItem
  display: flex
  gap: 8px
  align-items: center
</style>
