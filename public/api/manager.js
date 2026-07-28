;(function () {
  const api = window.ZudoAPI

  window.ManagerAPI = {
    getOverview() { return api.get('/auth/profile') },

    getLiveMonitor() { return api.get('/shift/active') },

    getSales(params) { return api.get(`/sales?${new URLSearchParams(params || {})}`) },
    getSalesStats() { return api.get('/sales/stats') },

    getInventory(params) { return api.get(`/products?${new URLSearchParams(params || {})}`) },
    updateStock(id, data) { return api.put(`/products/${id}`, data) },

    getCashiers(params) { return api.get(`/auth/staff?role=CASHIER&${new URLSearchParams(params || {})}`) },
    getCashier(id) { return api.get(`/auth/staff/${id}`) },

    getCustomers(params) { return api.get(`/auth/customers?${new URLSearchParams(params || {})}`) },
    getCustomer(id) { return api.get(`/auth/customers/${id}`) },

    getLoyaltyMembers(params) { return api.get(`/auth/loyalty?${new URLSearchParams(params || {})}`) },
    getLoyaltyMember(id) { return api.get(`/auth/loyalty/${id}`) },
    updateLoyaltyTier(id, tier) { return api.put(`/auth/loyalty/${id}/tier`, { tier }) },

    getAnalytics() { return api.get('/auth/analytics') },

    getShifts(params) { return api.get(`/shift/history?${new URLSearchParams(params || {})}`) },
    getShift(id) { return api.get(`/auth/shift/${id}`) },

    getNotifications() { return api.get('/auth/notifications') },
    updateNotificationSettings(data) { return api.put('/auth/notifications/settings', data) },

    getReports(type) { return api.get(`/auth/reports?type=${type || 'daily'}`) },

    getProfile() { return api.get('/auth/profile') },
  }
})()