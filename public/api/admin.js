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

    getStaff(params) { return api.get(`/auth/staff?${new URLSearchParams(params || {})}`) },
    getStaffMember(id) { return api.get(`/auth/staff/${id}`) },
    createStaff(data) { return api.post('/auth/staff', data) },
    updateStaff(id, data) { return api.put(`/auth/staff/${id}`, data) },
    getRoles() { return api.get('/auth/roles') },
    createRole(data) { return api.post('/auth/roles', data) },

    getCustomers(params) { return api.get(`/customers?${new URLSearchParams(params || {})}`) },
    getCustomer(id) { return api.get(`/customers/${id}`) },
    createCustomer(data) { return api.post('/customers', data) },
    getCustomerStats() { return api.get('/customers/stats') },

    getLoyaltyConfig() { return api.get('/auth/loyalty/config') },
    updateLoyaltyConfig(data) { return api.put('/auth/loyalty/config', data) },
    getLoyaltyActivity() { return api.get('/auth/loyalty/activity') },

    getAnalytics() { return api.get('/auth/analytics') },
    getBranchPerformance() { return api.get('/auth/analytics/branches') },
    getTopProducts() { return api.get('/auth/analytics/top-products') },

    getBranches() { return api.get('/auth/branches') },
    getBranch(id) { return api.get(`/auth/branches/${id}`) },
    createBranch(data) { return api.post('/auth/branches', data) },
    updateBranch(id, data) { return api.put(`/auth/branches/${id}`, data) },

    getSettings() { return api.get('/auth/settings') },
    updateSettings(data) { return api.put('/auth/settings', data) },

    getAuditLogs(params) { return api.get(`/auth/audit-logs?${new URLSearchParams(params || {})}`) },
  }
})()