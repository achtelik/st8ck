<script setup lang="ts">

  import type { Profile } from '@/stores/ProfileStore.types.ts'
  import { v4 as uuidv4 } from 'uuid'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify/framework'
  import router from '@/router'
  import { useAppStore } from '@/stores/AppStore.ts'
  import { useProfileStore } from '@/stores/ProfileStore.ts'

  const profileStore = useProfileStore()
  const appStore = useAppStore()
  const { locale } = useI18n()
  const { mobile } = useDisplay()

  const profile = ref<Profile>(profileStore.profile ?? {
    userId: uuidv4(),
    name: '',
    language: locale.value,
  })

  const languages = [
    { value: 'de', title: 'Deutsch' },
    { value: 'en', title: 'English' },
  ]

  watch(() => profile.value.language, newLanguage => {
    if (newLanguage) {
      locale.value = newLanguage
    }
  })

  async function save () {
    await appStore.executeLoading(() => profileStore.saveProfile(profile.value))
    router.push('/stackOverviewPage')
  }

</script>

<template>
  <div v-if="profile" :class="{content:true, 'content-desktop' : !mobile}">
    <v-card class="card">
      <v-img
        class="align-end"
        cover
        gradient="to bottom, rgba(0,0,0,.0), rgba(0,0,0,.8)"
        src="/images/st8ck-01.png"
      >
        <v-card-title class="title">{{ $t('profilePage.title') }}</v-card-title>
        <v-card-text class="description"> {{ $t('profilePage.description') }}</v-card-text>
      </v-img>
      <!-- <v-card-text>
        <v-text-field
          v-model="profile.name"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          :autofocus="profile.name == ''"
          class="centered-input"
          color="primary"
          inputmode="text"
          :label="$t('profilePage.yourName')"
          name="no-autofill"
          spellcheck="false"
          variant="underlined"
        />
      </v-card-text>-->
      <v-select v-model="profile.language" :items="languages" :label="$t('profilePage.yourLanguage')">
        <template #selection="{ item }">
          <div class="languageItem">
            <img class="languageImage" :src="`/images/flags/${item.raw.value}.png`" width="24">
            <div>{{ item.raw.title }}</div>
          </div>
        </template>

        <template #item="{ props, item }">
          <v-list-item v-bind="props" :title="undefined">
            <div class="languageItem">
              <img class="languageImage" :src="`/images/flags/${item.raw.value}.png`" width="24">
              <div :class="{'text-primary': item.raw.value == locale}">{{ item.raw.title }}</div>
            </div>
          </v-list-item>
        </template>
      </v-select>
      <v-card-actions>
        <v-btn
          class="cardAction"
          color="green-accent-4"
          :disabled="appStore.isLoading"
          :text="$t('global.save')"
          variant="tonal"
          @click="save()"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped lang="sass">

.title
  white-space: normal

.content
  display: flex
  flex-direction: column
  height: 100%
  width: 100%
  padding: 8px

.content-desktop
  justify-content: center

.centered-input :deep(.v-field__field)
  justify-content: center

.centered-input :deep(.v-field__outline)
  justify-content: center

.centered-input :deep(input)
  text-align: center

.languageItem
  display: flex
  gap: 8px
  align-items: center

.cardAction
  flex: 1 1 auto
</style>
