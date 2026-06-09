(() => {
  'use strict'

  // Keep in sync with Wiki/ci/lib/tfg-theme.mjs (light/dark only in UI)
  const TFG_THEME_KEY = 'tfg-theme'
  const DEFAULT_THEME = 'dark'

  const normalizeTheme = value => (value === 'light' || value === 'dark' ? value : null)

  const systemTheme = () =>
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

  const readStoredTheme = () => {
    const stored = normalizeTheme(localStorage.getItem(TFG_THEME_KEY))
    if (stored) {
      return stored
    }

    const preference = localStorage.getItem(TFG_THEME_KEY)
    if (preference === 'auto') {
      return systemTheme()
    }

    return DEFAULT_THEME
  }

  const writeStoredTheme = theme => {
    const normalized = normalizeTheme(theme)
    if (!normalized) {
      return
    }
    localStorage.setItem(TFG_THEME_KEY, normalized)
  }

  const resolvedTheme = () => {
    const bs = document.documentElement.getAttribute('data-bs-theme')
    if (bs === 'light' || bs === 'dark') {
      return bs
    }
    return readStoredTheme()
  }

  const notifyHandbookThemeChange = () => {
    const theme = resolvedTheme()
    window.dispatchEvent(new CustomEvent('handbook-theme-change', { detail: { theme } }))
    if (typeof globalThis.syncHandbookEmiTheme === 'function') {
      globalThis.syncHandbookEmiTheme(theme)
    }
  }

  const setTheme = theme => {
    const normalized = normalizeTheme(theme) || DEFAULT_THEME
    document.documentElement.setAttribute('data-bs-theme', normalized)
    notifyHandbookThemeChange()
    return normalized
  }

  const updateThemeButton = theme => {
    const lightIcon = document.querySelector('#bd-theme-icon-light')
    const darkIcon = document.querySelector('#bd-theme-icon-dark')
    if (!lightIcon || !darkIcon) {
      return
    }
    lightIcon.hidden = theme !== 'light'
    darkIcon.hidden = theme !== 'dark'
  }

  const syncFromStorage = () => {
    const theme = setTheme(readStoredTheme())
    updateThemeButton(theme)
  }

  setTheme(readStoredTheme())

  window.addEventListener('storage', event => {
    if (event.key !== TFG_THEME_KEY && event.key !== null) {
      return
    }
    syncFromStorage()
  })

  window.addEventListener('DOMContentLoaded', () => {
    const theme = resolvedTheme()
    updateThemeButton(theme)

    const toggle = document.querySelector('#bd-theme')
    if (!toggle) {
      return
    }

    toggle.addEventListener('click', () => {
      const next = resolvedTheme() === 'dark' ? 'light' : 'dark'
      writeStoredTheme(next)
      setTheme(next)
      updateThemeButton(next)
      toggle.focus()
    })
  })
})()
