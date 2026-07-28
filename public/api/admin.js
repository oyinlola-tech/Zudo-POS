;(function () {
  const api = window.ZudoAPI

  window.AdminAPI = {
    getOverview() { return api.get('/auth/profile') },

    getSales(params) { return api.get(`/sales?${new URLSearchParams(params || {})}`) },
    getSalesStats() { return api.get('/sales/stats') },

    getProducts(params) { return api.get(`/products?${new URLSearchParams(params || {})}`) },
    getProduct(id) { return api.get(`/products/${id}`) },
    createProduct(data) { return api.post('/products', data) },
    updateProduct(id, data) { return api.put(`/products/${id}`, data) },
    deleteProduct(id) { return api.delete(`/products/${id}`) },
    getInventoryStats() { return api.get('/products/inventory-stats') },

    getPOSessions(params) { return api.get(`/shift/history?${new URLSearchParams(params || {})}`) },

    getStaff(params) { return api.get(`/staff?${new URLSearchParams(params || {})}`) },
    getStaffMember(id) { return api.get(`/staff/${id}`) },
    createStaff(data) { return api.post('/staff', data) },
    updateStaff(id, data) { return api.put(`/staff/${id}`, data) },
    getRoles() { return api.get('/auth/roles') },
    createRole(data) { return api.post('/auth/roles', data) },

    getCustomers(params) { return api.get(`/customers?${new URLSearchParams(params || {})}`) },
    getCustomer(id) { return api.get(`/customers/${id}`) },
    createCustomer(data) { return api.post('/customers', data) },
    getCustomerStats() { return api.get('/customers/stats') },

    getLoyaltyConfig() { return api.get('/settings/loyalty/config') },
    updateLoyaltyConfig(data) { return api.put('/settings/loyalty/config', data) },
    getLoyaltyActivity() { return api.get('/settings/loyalty/activity') },

    getAnalytics() { return api.get('/analytics') },
    getBranchPerformance() { return api.get('/analytics/branches') },
    getTopProducts() { return api.get('/analytics') },

    getBranches() { return api.get('/settings/branches') },
    getBranch(id) { return api.get(`/settings/branches/${id}`) },
    createBranch(data) { return api.post('/settings/branches', data) },
    updateBranch(id, data) { return api.put(`/settings/branches/${id}`, data) },

    getSettings() { return api.get('/settings') },
    updateSettings(data) { return api.put('/settings', data) },

    getAuditLogs(params) { return api.get(`/settings/loyalty/activity?${new URLSearchParams(params || {})}`) },

    processReturn(data) { return api.post('/returns', data) },
    getReturns(params) { return api.get(`/returns?${new URLSearchParams(params || {})}`) },
  }
})()