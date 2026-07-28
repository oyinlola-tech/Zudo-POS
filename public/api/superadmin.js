;(function () {
  const api = window.ZudoAPI

  window.SuperAdminAPI = {
    getOverview() { return api.get('/auth/profile') },
    getRevenueData(period) { return api.get(`/auth/revenue?period=${period || 'month'}`) },
    getGrowthMetrics() { return api.get('/auth/growth') },

    getBusinesses(params) { return api.get(`/auth/businesses?${new URLSearchParams(params || {})}`) },
    getBusiness(id) { return api.get(`/auth/businesses/${id}`) },
    createBusiness(data) { return api.post('/auth/businesses', data) },
    updateBusiness(id, data) { return api.put(`/auth/businesses/${id}`, data) },
    suspendBusiness(id) { return api.post(`/auth/businesses/${id}/suspend`) },
    activateBusiness(id) { return api.post(`/auth/businesses/${id}/activate`) },

    getPlans() { return api.get('/auth/billing/plans') },
    createPlan(data) { return api.post('/auth/billing/plans', data) },
    updatePlan(id, data) { return api.put(`/auth/billing/plans/${id}`, data) },
    getInvoices(params) { return api.get(`/auth/billing/invoices?${new URLSearchParams(params || {})}`) },
    getInvoice(id) { return api.get(`/auth/billing/invoices/${id}`) },
    getSubscriptionStats() { return api.get('/auth/billing/subscriptions/stats') },

    getAuditLogs(params) { return api.get(`/auth/audit-logs?${new URLSearchParams(params || {})}`) },

    getAnalytics(period) { return api.get(`/auth/analytics?period=${period || 'month'}`) },
    getRevenueByPlan() { return api.get('/auth/analytics/revenue-by-plan') },
    getPlanDistribution() { return api.get('/auth/analytics/plan-distribution') },

    sendBroadcast(data) { return api.post('/auth/notifications/broadcast', data) },
    getBroadcastHistory() { return api.get('/auth/notifications/history') },

    getSettings() { return api.get('/auth/settings') },
    updateSettings(data) { return api.put('/auth/settings', data) },
  }
})()