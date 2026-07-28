;(function () {
  const api = window.ZudoAPI

  window.CashierAPI = {
    getTerminalData() { return api.get('/auth/profile') },

    getProducts(query) { return api.get(`/products?search=${encodeURIComponent(query || '')}`) },
    searchProducts(q) { return api.get(`/products/search?q=${encodeURIComponent(q)}`) },

    createTransaction(data) { return api.post('/sales', data) },
    getTransactions(params) { return api.get(`/sales?${new URLSearchParams(params || {})}`) },
    getTransaction(id) { return api.get(`/sales/${id}`) },
    voidTransaction(id) { return api.post(`/sales/${id}/void`) },

    getCustomers(params) { return api.get(`/customers?${new URLSearchParams(params || {})}`) },
    getCustomer(id) { return api.get(`/customers/${id}`) },
    createCustomer(data) { return api.post('/customers', data) },

    getShift() { return api.get('/shift/active') },
    startShift(data) { return api.post('/shift/start', data) },
    endShift(data) { return api.post('/shift/end', data) },
    getShiftHistory() { return api.get('/shift/history') },

    processReturn(data) { return api.post('/returns', data) },
    getReturns(params) { return api.get(`/returns?${new URLSearchParams(params || {})}`) },

    getProfile() { return api.get('/auth/profile') },
  }
})()