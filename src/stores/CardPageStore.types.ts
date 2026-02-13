import type { I18nText } from '@/stores/common.types.ts'

export interface Stack {
  key: string
  foreignLanguage: string
  audioUrl: string
  title: I18nText[]
  items: StackItem[] | undefined
}

export interface StackItem {
  foreign: string
  audio: string
  native: I18nText[]
}
