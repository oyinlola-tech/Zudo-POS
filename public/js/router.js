;(function () {
  const router = {
    currentPath: window.location.pathname,

    async navigate(path, pushHistory = true) {
      if (path === this.currentPath) return

      if (!path.startsWith('/admin') && !path.startsWith('/cashier') && !path.startsWith('/manager') && !path.startsWith('/superadmin')) {
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

      try {
        const res = await fetch(path)
        if (!res.ok) throw new Error('Page not found')
        const html = await res.text()

        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')

        const newApp = doc.getElementById('app')
        const newMain = doc.querySelector('main')
        const content = newApp || newMain || doc.body

        app.innerHTML = content.innerHTML

        doc.querySelectorAll('script').forEach(s => {
          if (s.id === 'tailwind-config') return
          const script = document.createElement('script')
          if (s.src) {
            if (!document.querySelector(`script[src="${s.src}"]`)) {
              script.src = s.src
              script.async = false
              document.body.appendChild(script)
            }
          } else if (s.textContent) {
            script.textContent = s.textContent
            document.body.appendChild(script)
            document.body.removeChild(script)
          }
        })

        document.dispatchEvent(new CustomEvent('router-navigated', { detail: { path } }))

        setTimeout(() => {
          const comps = document.querySelectorAll('[data-component]')
          if (comps.length > 0) window.loadComponents?.()
          this.setActiveNav()
        }, 50)
      } catch {
        window.location.href = path
      }
    },

    setActiveNav() {
      document.querySelectorAll('[data-nav]').forEach(link => {
        const path = link.getAttribute('data-nav') || link.getAttribute('href')
        const isActive = path === this.currentPath
        link.classList.toggle('active', isActive)
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
        this.navigate(path, false)
      })

      this.setActiveNav()
    },
  }

  window.ZudoRouter = router
  document.addEventListener('DOMContentLoaded', () => router.start())
})()