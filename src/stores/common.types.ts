export interface I18nText {
  language: string
  text: string
}

export function i18nTextByLanguage (textArray: I18nText[], language: string): string {
  return textArray.find(value => value.language.toLowerCase() === language.toLowerCase())?.text ?? ''
}
