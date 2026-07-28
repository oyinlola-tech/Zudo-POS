;(function () {
  const API_BASE = '/api'

  window.ZudoAPI = {
    async request(method, path, body) {
      const token = localStorage.getItem('zudo_token')
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      try {
        const res = await fetch(`${API_BASE}${path}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: res.statusText }))
          throw new Error(err.message || `Request failed: ${res.status}`)
        }
        return await res.json()
      } catch (err) {
        console.error(`API ${method} ${path}:`, err)
        throw err
      }
    },

    get(path) { return this.request('GET', path) },
    post(path, body) { return this.request('POST', path, body) },
    put(path, body) { return this.request('PUT', path, body) },
    delete(path) { return this.request('DELETE', path) },

    setToken(token) {
      localStorage.setItem('zudo_token', token)
    },

    clearToken() {
      localStorage.removeItem('zudo_token')
      localStorage.removeItem('zudo_user')
    },

    getToken() {
      return localStorage.getItem('zudo_token')
    },

    setUser(user) {
      localStorage.setItem('zudo_user', JSON.stringify(user))
    },

    getUser() {
      try {
        return JSON.parse(localStorage.getItem('zudo_user'))
      } catch {
        return null
      }
    },

    isAuthenticated() {
      return !!this.getToken()
    },
  }
})()