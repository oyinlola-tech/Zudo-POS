;(async function () {
  const init = window.__pageInit
  if (!init) return

  const appEl = document.getElementById('app') || document.querySelector('main') || document.body

  async function populate() {
    try {
      if (typeof init.fetch === 'function') {
        const data = await init.fetch()
        if (data) {
          await window.DataBind.bind(appEl, data)
          if (typeof init.afterBind === 'function') {
            init.afterBind(data)
          }
        }
      }
    } catch (err) {
      console.error('Page init failed:', err)
    }
  }

  // Wait for components to load first
  document.addEventListener('components-loaded', populate, { once: true })
  // Fallback: if components already loaded
  setTimeout(populate, 500)
})()