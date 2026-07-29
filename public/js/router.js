;(function () {
  function createLoader() {
    const el = document.createElement('div')
    el.id = 'router-loader'
    el.innerHTML = `<div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl px-8 py-6 flex items-center gap-4">
        <div class="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Loading...</span>
      </div>
    </div>`
    el.style.display = 'none'
    document.body.appendChild(el)
    return el
  }

  const loader = createLoader()
  let loading = false

  function showLoader() {
    loading = true
    loader.style.display = ''
    requestAnimationFrame(() => loader.firstElementChild?.classList.remove('opacity-0'))
  }

  function hideLoader() {
    loading = false
    const child = loader.firstElementChild
    if (child) {
      child.classList.add('opacity-0')
      setTimeout(() => { loader.style.display = 'none' }, 300)
    } else {
      loader.style.display = 'none'
    }
  }

  function stripHTML(html) {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const router = {
    currentPath: window.location.pathname,

    isDashboardPath(path) {
      return path.startsWith('/admin') || path.startsWith('/cashier') || path.startsWith('/manager') || path.startsWith('/superadmin')
    },

    async navigate(path, pushHistory = true) {
      if (path === this.currentPath || loading) return

      if (!this.isDashboardPath(path)) {
        window.location.href = path
        return
      }

      this.currentPath = path
      if (pushHistory) window.history.pushState({ path }, '', path)

      const app = document.getElementById('app')
      if (!app) {
        window.location.href = path
        return
      }

      showLoader()

      try {
        const res = await fetch(path)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const html = await res.text()

        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')

        const newApp = doc.getElementById('app')
        const newMain = doc.querySelector('main')
        const content = newApp || newMain || doc.body

        document.title = doc.title || 'Zudo POS'

        content.querySelectorAll('script').forEach(s => s.remove())
        app.innerHTML = content.innerHTML

        const scripts = doc.querySelectorAll('script')
        scripts.forEach(s => {
          if (s.id === 'tailwind-config') return
          if (s.src && !document.querySelector(`script[src="${s.src}"]`)) {
            const ns = document.createElement('script')
            ns.src = s.src
            ns.async = false
            document.body.appendChild(ns)
          } else if (s.textContent && !s.textContent.includes('components.js')) {
            try {
              const ns = document.createElement('script')
              ns.textContent = s.textContent
              document.body.appendChild(ns)
              document.body.removeChild(ns)
            } catch {}
          }
        })

        hideLoader()

        setTimeout(() => {
          if (window.loadComponents) window.loadComponents()
          else {
            const comps = document.querySelectorAll('[data-component]')
            if (comps.length > 0) {
              import('/js/components.js')
            }
          }
          this.setActiveNav()
        }, 50)
      } catch (err) {
        hideLoader()
        app.innerHTML = `<div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">cloud_off</span>
          <h2 class="text-xl font-bold text-slate-700 mb-2">Failed to load page</h2>
          <p class="text-slate-500 mb-6">${stripHTML(err.message)}</p>
          <button onclick="ZudoRouter.navigate('${this.currentPath}')" class="px-6 py-2 bg-secondary text-white rounded-xl font-medium hover:bg-secondary/90 transition-colors">Try again</button>
        </div>`
      }
    },

    setActiveNav() {
      document.querySelectorAll('[data-nav]').forEach(link => {
        const path = link.getAttribute('data-nav')
        const href = link.getAttribute('href')
        const target = path || href
        const isActive = target === this.currentPath
        link.classList.toggle('router-active', isActive)
      })
    },

    start() {
      document.addEventListener('click', e => {
        const link = e.target.closest('[data-nav]')
        if (!link) return
        const path = link.getAttribute('data-nav')
        if (!path || path.startsWith('http') || path.startsWith('#')) return
        e.preventDefault()
        this.navigate(path)
      })

      window.addEventListener('popstate', e => {
        const path = e.state?.path || window.location.pathname
        if (path !== this.currentPath) this.navigate(path, false)
      })

      this.setActiveNav()
    },
  }

  window.ZudoRouter = router
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => router.start())
  } else {
    router.start()
  }
})()