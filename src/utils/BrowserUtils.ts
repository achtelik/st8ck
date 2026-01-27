const BrowserUtils = {
  detectBrowserLanguage (): string {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return 'en'
    }
    try {
      const saved = localStorage.getItem('language')
      if (saved) {
        return saved
      }
    } catch {
      // ignore localStorage error
    }
    const nav = navigator as any
    const lang = (nav.languages && nav.languages[0]) || nav.language || 'en'
    return lang.split('-')[0].toLowerCase()
  },
}

export default BrowserUtils
