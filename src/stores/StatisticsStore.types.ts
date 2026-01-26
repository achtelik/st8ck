export interface StatisticsData {
  data: StatisticStackData[]
}

export interface StatisticStackData {
  key: string // the key of the data set, e.g., "fr-en-basics"
  foreignLanguage: string
  nativeLanguage: string
  data: StatisticsStackDataEntry[]
}

export interface StatisticsStackDataEntry {
  text: string
  correctTimeline: number[] // timestamp as long
  wrongTimeline: number[] // timestamp as long
}
