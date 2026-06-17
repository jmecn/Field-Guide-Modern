const GISCUS = {
  repo: 'TerraFirmaGreg-Team/Modpack-Modern',
  repoId: 'R_kgDOH_FIbA',
  category: 'General',
  categoryId: 'DIC_kwDOH_FIbM4CbMDm',
}

const GISCUS_LANG = {
  en_us: 'en',
  zh_cn: 'zh-CN',
  zh_tw: 'zh-TW',
  zh_hk: 'zh-TW',
  ja_jp: 'ja',
  ko_kr: 'ko',
  fr_fr: 'fr',
  de_de: 'de',
  es_es: 'es',
  ru_ru: 'ru',
  uk_ua: 'ru',
  pl_pl: 'pl',
  pt_br: 'pt',
  tr_tr: 'tr',
  sv_se: 'sv',
  hu_hu: 'hu',
}

function giscusLang(locale) {
  const key = String(locale || '').trim().toLowerCase().replace(/-/g, '_')
  return GISCUS_LANG[key] || 'en'
}

function giscusTheme() {
  return document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light'
}

async function init() {
  const section = document.getElementById('comments')
  const container = document.getElementById('giscus-container')
  if (!section || !container) return

  try {
    const res = await fetch('/giscus-config.json')
    if (res.ok) {
      const json = await res.json()
      if (json.enabled === false) return
      Object.assign(GISCUS, json)
    }
  } catch {
  }

  await import('https://cdn.jsdelivr.net/npm/giscus@1/dist/giscus.js')

  const widget = document.createElement('giscus-widget')
  widget.setAttribute('repo', GISCUS.repo)
  widget.setAttribute('repo-id', GISCUS.repoId)
  widget.setAttribute('category', GISCUS.category)
  widget.setAttribute('category-id', GISCUS.categoryId)
  widget.setAttribute('mapping', 'pathname')
  widget.setAttribute('theme', giscusTheme())
  widget.setAttribute('lang', giscusLang(section.dataset.giscusLang))
  widget.setAttribute('reactions-enabled', '1')
  widget.setAttribute('emit-metadata', '0')
  widget.setAttribute('input-position', 'bottom')
  widget.setAttribute('loading', 'lazy')
  container.replaceChildren(widget)

  section.hidden = false

  const applyTheme = () => {
    widget.theme = giscusTheme()
  }

  window.addEventListener('handbook-theme-change', applyTheme)

  new MutationObserver(applyTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme'],
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => void init())
} else {
  void init()
}
