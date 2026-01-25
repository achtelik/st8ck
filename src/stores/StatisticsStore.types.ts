export interface StatisticsData {
  key: string
  foreignLanguage: string
  nativeLanguage: string
  data: StatisticsDataEntry[] | undefined
}

export interface StatisticsDataEntry {
  text: string
  correctCount: number
  wrongCount: number
  totalCount: number
}
