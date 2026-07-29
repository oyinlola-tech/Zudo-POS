;(function () {
  const api = window.ZudoAPI

  window.ManagerAPI = {
    getOverview() { return api.get('/auth/profile') },

    getLiveMonitor() { return api.get('/shift/active') },

    getSales(params) { return api.get(`/sales?${new URLSearchParams(params || {})}`) },
    getSalesStats() { return api.get('/sales/stats') },

    getInventory(params) { return api.get(`/products?${new URLSearchParams(params || {})}`) },
    updateStock(id, data) { return api.put(`/products/${id}`, data) },

    getCashiers(params) { return api.get(`/staff?role=CASHIER&${new URLSearchParams(params || {})}`) },
    getCashier(id) { return api.get(`/staff/${id}`) },

    getCustomers(params) { return api.get(`/customers?${new URLSearchParams(params || {})}`) },
    getCustomer(id) { return api.get(`/customers/${id}`) },

    getLoyaltyMembers(params) { return api.get(`/loyalty?${new URLSearchParams(params || {})}`) },
    getLoyaltyMember(id) { return api.get(`/loyalty/${id}`) },
    updateLoyaltyTier(id, tier) { return api.put(`/loyalty/${id}/tier`, { tier }) },

    getAnalytics() { return api.get('/analytics') },

    getShifts(params) { return api.get(`/shift/history?${new URLSearchParams(params || {})}`) },
    getShift(id) { return api.get(`/shift/${id}`) },

    getNotifications() { return api.get('/auth/notifications') },
    updateNotificationSettings(data) { return api.put('/auth/notifications/settings', data) },

    getReports(type) { return api.get(`/auth/reports?type=${type || 'daily'}`) },

    getProfile() { return api.get('/auth/profile') },
  }
})()