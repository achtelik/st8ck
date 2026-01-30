import type { I18nText } from '@/stores/common.types.ts'

export interface StackPath {
  title: I18nText[]
  items: StackPathItem[]
}

export interface StackPathItem {
  id: string
  dataUrl: string
  imageUrl: string
  title: I18nText[]
  description: I18nText[]
}
