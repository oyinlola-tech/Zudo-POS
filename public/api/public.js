;(function () {
  const api = window.ZudoAPI

  window.PublicAPI = {
    getPricing() { return api.get('/public/pricing') },
    getFeatures() { return api.get('/public/features') },
    getProduct() { return api.get('/public/product') },
    getTestimonials() { return api.get('/public/testimonials') },
    getContactInfo() { return api.get('/public/contact') },
    getResources() { return api.get('/public/resources') },
    getSolutions() { return api.get('/public/solutions') },
    getDemo() { return api.get('/public/demo') },
    getStats() { return api.get('/public/stats') },
  }
})()