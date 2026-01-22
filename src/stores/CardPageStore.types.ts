export interface Data {
  title: string
  data: DataEntry[] | undefined
}

export interface DataEntry {
  foreign: string
  native: string
  context: string
}
