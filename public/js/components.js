;(async function () {
  async function loadComponents() {
    const components = document.querySelectorAll('[data-component]')
    if (components.length === 0) return

    const loadPromises = Array.from(components).map(async (el) => {
      const name = el.getAttribute('data-component')
      if (!name) return
      try {
        const res = await fetch(`/components/${name}.html`)
        if (!res.ok) throw new Error(`Failed to load component: ${name}`)
        const html = await res.text()
        el.outerHTML = html
      } catch (err) {
        console.error(err)
      }
    })

    await Promise.all(loadPromises)

    const currentPath = window.location.pathname
    document.querySelectorAll('aside nav a[href], [data-component-nav] a[href]').forEach((link) => {
      const href = link.getAttribute('href')
      if (!href) return
      if (href === currentPath) {
        link.classList.add('active')
        link.classList.remove('text-slate-400')
        link.classList.add('bg-[#6f46b9]', 'text-white', 'scale-95')
        link.classList.remove('hover:bg-slate-900')
        link.classList.add('bg-emerald-600/10', 'text-emerald-400', 'border-l-4', 'border-emerald-500')
        link.classList.add('bg-surface-container-lowest', 'text-secondary', 'rounded-l-full', 'ml-4', 'shadow-sm', 'font-bold')
        link.classList.remove('text-on-surface-variant')
        link.classList.remove('text-slate-400')
        link.classList.add('bg-amber-500/15', 'text-amber-400', 'border-l-4', 'border-amber-500')
      }
    })

    document.dispatchEvent(new Event('components-loaded'))
  }

  window.loadComponents = loadComponents
  await loadComponents()
})()