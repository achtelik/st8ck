export interface StackOverview {
  items: StackOverviewItem[]
}

export interface StackOverviewItem {
  id: string
  titles: StackTitle[]
  imageUrl: string
  pathDataUrl: string
}

export interface StackTitle {
  language: string
  text: string
}
