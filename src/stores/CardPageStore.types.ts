export interface Data {
  key: string
  foreignLanguage: string
  nativeLanguage: string
  data: DataEntry[] | undefined
}

export interface DataEntry {
  foreign: string
  audio: string
  native: string
}
