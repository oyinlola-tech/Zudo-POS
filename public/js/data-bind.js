;(function () {
  const bindCache = new Map()

  function resolvePath(obj, path) {
    return path.split('.').reduce((acc, part) => {
      if (acc == null) return ''
      const arrMatch = part.match(/^(\w+)\[(\d+)\]$/)
      if (arrMatch) {
        const [, key, idx] = arrMatch
        return acc[key] ? acc[key][parseInt(idx)] : ''
      }
      return acc[part] !== undefined ? acc[part] : ''
    }, obj)
  }

  function formatValue(val, format) {
    if (val == null || val === '') return '—'
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(val))
      case 'number':
        return new Intl.NumberFormat('en-US').format(Number(val))
      case 'percentage':
        return `${Number(val).toFixed(1)}%`
      case 'date':
        return new Date(val).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      case 'datetime':
        return new Date(val).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      case 'time':
        return new Date(val).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      default:
        return val
    }
  }

  function getStatusClass(status) {
    const map = {
      active: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      suspended: 'bg-red-100 text-red-700',
      completed: 'bg-emerald-100 text-emerald-700',
      refunded: 'bg-red-100 text-red-700',
      cancelled: 'bg-slate-100 text-slate-600',
      paid: 'bg-emerald-100 text-emerald-700',
      overdue: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
      warning: 'bg-amber-100 text-amber-700',
      critical: 'bg-red-100 text-red-700',
    }
    return map[status?.toLowerCase()] || 'bg-slate-100 text-slate-600'
  }

  window.DataBind = {
    getStatusClass,
    async bind(container, data) {
      if (!container) container = document
      else if (typeof container === 'string') container = document.querySelector(container)

      const textEls = container.querySelectorAll('[data-text]')
      textEls.forEach(el => {
        const path = el.getAttribute('data-text')
        const format = el.getAttribute('data-format')
        const val = resolvePath(data, path)
        el.textContent = formatValue(val, format)
      })

      const htmlEls = container.querySelectorAll('[data-html]')
      htmlEls.forEach(el => {
        const path = el.getAttribute('data-html')
        const val = resolvePath(data, path)
        el.innerHTML = val
      })

      const attrEls = container.querySelectorAll('[data-attr]')
      attrEls.forEach(el => {
        const attrDef = el.getAttribute('data-attr')
        attrDef.split(';').forEach(pair => {
          const [attr, path] = pair.split(':')
          const val = resolvePath(data, path.trim())
          if (val) el.setAttribute(attr.trim(), val)
        })
      })

      const listEls = container.querySelectorAll('[data-list]')
      listEls.forEach(template => {
        const path = template.getAttribute('data-list')
        const items = resolvePath(data, path)
        if (!Array.isArray(items) || items.length === 0) {
          const emptyMsg = template.getAttribute('data-empty')
          if (emptyMsg) {
            const emptyRow = document.createElement('tr')
            const colspan = template.querySelector('td')?.colSpan || 1
            emptyRow.innerHTML = `<td colspan="${colspan}" class="px-6 py-8 text-center text-on-surface-variant text-sm">${emptyMsg}</td>`
            template.parentNode.replaceChild(emptyRow, template)
          }
          return
        }

        const parent = template.parentNode
        const fragment = document.createDocumentFragment()

        items.forEach((item, index) => {
          const clone = template.content ? template.content.cloneNode(true) : template.cloneNode(true)
          clone.querySelectorAll('[data-text]').forEach(el => {
            const path = el.getAttribute('data-text').replace(/\$index/g, index)
            const format = el.getAttribute('data-format')
            const val = resolvePath(item, path)
            el.textContent = formatValue(val, format)
          })
          clone.querySelectorAll('[data-html]').forEach(el => {
            const path = el.getAttribute('data-html').replace(/\$index/g, index)
            const val = resolvePath(item, path)
            el.innerHTML = val
          })
          clone.querySelectorAll('[data-attr]').forEach(el => {
            const attrDef = el.getAttribute('data-attr')
            attrDef.split(';').forEach(pair => {
              const [attr, path] = pair.split(':')
              const val = resolvePath(item, path.trim())
              if (val) el.setAttribute(attr.trim(), val)
            })
          })
          clone.querySelectorAll('[data-class]').forEach(el => {
            const path = el.getAttribute('data-class')
            const val = resolvePath(item, path)
            if (val) el.className = getStatusClass(val)
          })
          fragment.appendChild(clone)
        })

        if (template.content) {
          const tbody = template.closest('tbody') || parent
          tbody.innerHTML = ''
          tbody.appendChild(fragment)
        } else {
          template.replaceWith(fragment)
        }
      })

      const showEls = container.querySelectorAll('[data-show]')
      showEls.forEach(el => {
        const path = el.getAttribute('data-show')
        const val = resolvePath(data, path)
        el.style.display = val ? '' : 'none'
      })

      const hideEls = container.querySelectorAll('[data-hide]')
      hideEls.forEach(el => {
        const path = el.getAttribute('data-hide')
        const val = resolvePath(data, path)
        el.style.display = val ? 'none' : ''
      })
    },

    clear(container) {
      if (typeof container === 'string') container = document.querySelector(container)
      const listEls = container.querySelectorAll('[data-list]')
      listEls.forEach(el => {
        const template = el.content || el.cloneNode(true)
        const parent = el.parentNode
        parent.innerHTML = ''
        if (template.content) {
          parent.appendChild(document.importNode(template, true))
        } else {
          parent.appendChild(template)
        }
      })
    },
  }
})()