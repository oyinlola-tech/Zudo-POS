;(function () {
  const api = window.ZudoAPI

  window.AuthAPI = {
    login(email, password) {
      return api.post('/auth/login', { email, password }).then((res) => {
        if (res.token) {
          api.setToken(res.token)
          api.setUser(res.user)
          if (res.user) ZudoUtils.setUserRole(res.user.role)
        }
        return res
      })
    },

    register(data) {
      return api.post('/auth/register', data).then((res) => {
        if (res.token) {
          api.setToken(res.token)
          api.setUser(res.user)
          if (res.user) ZudoUtils.setUserRole(res.user.role)
        }
        return res
      })
    },

    logout() {
      api.clearToken()
      localStorage.removeItem('zudo_role')
      window.location.href = '/login'
    },

    getSession() { return api.get('/auth/session') },
    getProfile() { return api.get('/auth/profile') },

    forgotPassword(email) { return api.post('/auth/forgot-password', { email }) },

    resetPassword(email, otp, newPassword) {
      return api.post('/auth/reset-password', { email, otp, newPassword })
    },

    changePassword(currentPassword, newPassword) {
      return api.post('/auth/change-password', { currentPassword, newPassword })
    },

    sendOtp(email, type) { return api.post('/auth/send-otp', { email, type }) },
    verifyOtp(email, code, type) { return api.post('/auth/verify-otp', { email, code, type }) },

    setupPin(pin) { return api.post('/auth/setup-pin', { pin }) },
    changePin(currentPin, newPin) { return api.post('/auth/change-pin', { currentPin, newPin }) },
    forgotPin(email, otp, newPin) { return api.post('/auth/forgot-pin', { email, otp, newPin }) },

    adminChangeStaffPin(staffId, newPin) {
      return api.post('/auth/admin-change-staff-pin', { staffId, newPin })
    },

    setupBusiness(data) { return api.post('/auth/register', data) },
    setupStore(data) { return api.post('/auth/setup/store', data) },
    setupStaff(data) { return api.post('/auth/setup/staff', data) },
    setupProducts(data) { return api.post('/auth/setup/products', data) },
    setupFeatures(data) { return api.post('/auth/setup/features', data) },
    completeOnboarding() { return api.post('/auth/setup/complete') },
  }
})()