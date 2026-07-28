

const ZudoAdmin = {
  init: function() {
    this.initSettings();
    this.initStaffManagement();
    this.initAnalytics();
  },

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

    saveSetting: function(setting, value) {
    const settings = JSON.parse(localStorage.getItem('zudo_settings') || '{}');
    settings[setting] = value;
    localStorage.setItem('zudo_settings', JSON.stringify(settings));
    ZudoUtils.showToast('Settings saved', 'success');
  },

  initStaffManagement: function() {
    const roleSelects = document.querySelectorAll('[data-role-select]');
    
    roleSelects.forEach(select => {
      select.addEventListener('change', () => {
        const staffId = select.dataset.staffId;
        const role = select.value;
        this.updateStaffRole(staffId, role);
      });
    });

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

  updateStaffRole: function(staffId, role) {
    console.log('Updating staff role:', staffId, role);
    ZudoUtils.showToast(`Role updated to ${role}`, 'success');
  },

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

  updateAnalytics: function(filter, value) {
    console.log('Updating analytics:', filter, value);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-admin]')) {
    ZudoAdmin.init();
  }
});