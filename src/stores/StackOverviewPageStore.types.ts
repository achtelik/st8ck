import type { I18nText } from '@/stores/common.types.ts'

export interface StackOverview {
  items: StackOverviewItem[]
}

export interface StackOverviewItem {
  id: string
  titles: I18nText[]
  imageUrl: string
  pathDataUrl: string
}
