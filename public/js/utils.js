/**
 * Zudo POS - Utility Functions
 * Common shared utilities for the application
 */

const ZudoUtils = {
  /**
   * Get current user's role from localStorage
   */
  getUserRole: function() {
    return localStorage.getItem('zudo_role') || 'admin';
  },

  /**
   * Set user role in localStorage
   */
  setUserRole: function(role) {
    localStorage.setItem('zudo_role', role);
  },

  /**
   * Get session token
   */
  getToken: function() {
    return localStorage.getItem('zudo_token');
  },

  /**
   * Set session token
   */
  setToken: function(token) {
    localStorage.setItem('zudo_token', token);
  },

  /**
   * Clear session
   */
  clearSession: function() {
    localStorage.removeItem('zudo_token');
    localStorage.removeItem('zudo_role');
    localStorage.removeItem('zudo_user');
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn: function() {
    return !!this.getToken();
  },

  /**
   * Get user's branch
   */
  getBranch: function() {
    return localStorage.getItem('zudo_branch') || 'Lagos Main';
  },

  /**
   * Set user's branch
   */
  setBranch: function(branch) {
    localStorage.setItem('zudo_branch', branch);
  },

  /**
   * Format currency (Nigerian Naira)
   */
  formatCurrency: function(amount) {
    return '₦' + parseFloat(amount).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  /**
   * Format date
   */
  formatDate: function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },

  /**
   * Format datetime
   */
  formatDateTime: function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Get current page name from URL
   */
  getCurrentPage: function() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page || 'index.html';
  },

  /**
   * Toggle theme (light/dark)
   */
  toggleTheme: function() {
    const html = document.documentElement;
    const current = html.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    
    html.classList.remove(current);
    html.classList.add(next);
    localStorage.setItem('zudo_theme', next);
    
    return next;
  },

  /**
   * Get theme preference
   */
  getTheme: function() {
    return localStorage.getItem('zudo_theme') || 'light';
  },

  /**
   * Apply theme
   */
  applyTheme: function() {
    const theme = this.getTheme();
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  },

  /**
   * Show notification toast
   */
  showToast: function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up transition-all ${
      type === 'success' ? 'bg-emerald-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-slate-800 text-white'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /**
   * Debounce function
   */
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Generate unique ID
   */
  generateId: function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ZudoUtils;
}