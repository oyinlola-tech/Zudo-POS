/**
 * Zudo POS - Admin Module
 * Specific functionality for admin dashboard
 */

const ZudoAdmin = {
  /**
   * Initialize admin dashboard
   */
  init: function() {
    this.initSettings();
    this.initStaffManagement();
    this.initAnalytics();
  },

  /**
   * Initialize settings toggles
   */
  initSettings: function() {
    const toggles = document.querySelectorAll('[data-setting-toggle]');
    
    toggles.forEach(toggle => {
      toggle.addEventListener('change', () => {
        const setting = toggle.dataset.setting;
        const value = toggle.checked;
        this.saveSetting(setting, value);
      });
    });
  },

  /**
   * Save setting
   */
  saveSetting: function(setting, value) {
    const settings = JSON.parse(localStorage.getItem('zudo_settings') || '{}');
    settings[setting] = value;
    localStorage.setItem('zudo_settings', JSON.stringify(settings));
    ZudoUtils.showToast('Settings saved', 'success');
  },

  /**
   * Initialize staff role management
   */
  initStaffManagement: function() {
    const roleSelects = document.querySelectorAll('[data-role-select]');
    
    roleSelects.forEach(select => {
      select.addEventListener('change', () => {
        const staffId = select.dataset.staffId;
        const role = select.value;
        this.updateStaffRole(staffId, role);
      });
    });

    // Add staff modal
    const addButton = document.querySelector('[data-add-staff]');
    const modal = document.querySelector('[data-staff-modal]');
    const closeButtons = modal?.querySelectorAll('[data-modal-close]');

    if (addButton && modal) {
      addButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });

      closeButtons?.forEach(button => {
        button.addEventListener('click', () => {
          modal.classList.add('hidden');
        });
      });
    }
  },

  /**
   * Update staff role
   */
  updateStaffRole: function(staffId, role) {
    console.log('Updating staff role:', staffId, role);
    ZudoUtils.showToast(`Role updated to ${role}`, 'success');
  },

  /**
   * Initialize analytics filters
   */
  initAnalytics: function() {
    const filterSelects = document.querySelectorAll('[data-analytics-filter]');
    
    filterSelects.forEach(select => {
      select.addEventListener('change', () => {
        const filter = select.dataset.filter;
        const value = select.value;
        this.updateAnalytics(filter, value);
      });
    });
  },

  /**
   * Update analytics
   */
  updateAnalytics: function(filter, value) {
    console.log('Updating analytics:', filter, value);
    // In real app, would fetch new data
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-admin]')) {
    ZudoAdmin.init();
  }
});