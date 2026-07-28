;(async function () {
  async function initPage() {
    const init = window.__pageInit
    if (!init) return

    const appEl = document.getElementById('app') || document.querySelector('main') || document.body

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

  document.addEventListener('components-loaded', initPage, { once: true })
  document.addEventListener('router-navigated', () => {
    setTimeout(initPage, 100)
  })
  setTimeout(initPage, 500)
})()