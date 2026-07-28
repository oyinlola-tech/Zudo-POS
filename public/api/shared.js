;(function () {
  const api = window.ZudoAPI

  window.SharedAPI = {
    getProfile() { return api.get('/auth/profile') },
    updateProfile(data) { return api.put('/auth/profile', data) },
    getNotifications() { return api.get('/auth/notifications') },
    markNotificationRead(id) { return api.put(`/auth/notifications/${id}/read`) },
    getAuditLogs(params) { return api.get(`/auth/audit-logs?${new URLSearchParams(params || {})}`) },
    uploadFile(formData) {
      const token = localStorage.getItem('zudo_token')
      return fetch(`/api/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      }).then((r) => r.json())
    },
  }
})()