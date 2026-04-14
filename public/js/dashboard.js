/**
 * Zudo POS - Dashboard Module
 * Common functionality for all dashboard pages
 */

const ZudoDashboard = {
  /**
   * Initialize dashboard
   */
  init: function() {
    this.initSearch();
    this.initNotifications();
    this.initUserMenu();
    this.initDatePicker();
  },

  /**
   * Initialize header search functionality
   */
  initSearch: function() {
    const searchInput = document.querySelector('[data-search-input]');
    const searchButton = document.querySelector('[data-search-button]');
    
    if (searchInput) {
      searchInput.addEventListener('keyup', ZudoUtils.debounce((e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          this.performSearch(query);
        }
      }, 300));
    }

    if (searchButton && searchInput) {
      searchButton.addEventListener('click', () => {
        this.performSearch(searchInput.value.trim());
      });
    }
  },

  /**
   * Perform search
   */
  performSearch: function(query) {
    console.log('Searching for:', query);
    // In a real app, this would query an API
    ZudoUtils.showToast(`Searching for "${query}"...`, 'info');
  },

  /**
   * Initialize notifications dropdown
   */
  initNotifications: function() {
    const notifButton = document.querySelector('[data-notifications-button]');
    const notifDropdown = document.querySelector('[data-notifications-dropdown]');
    
    if (notifButton && notifDropdown) {
      notifButton.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
        notifDropdown.classList.toggle('opacity-0');
        notifDropdown.classList.toggle('opacity-100');
      });

      document.addEventListener('click', () => {
        notifDropdown.classList.add('hidden', 'opacity-0');
        notifDropdown.classList.remove('opacity-100');
      });
    }

    // Mark notifications as read
    const markReadButtons = document.querySelectorAll('[data-mark-read]');
    markReadButtons.forEach(button => {
      button.addEventListener('click', function() {
        const item = this.closest('[data-notification-item]');
        if (item) {
          item.classList.remove('bg-emerald-500/10');
          item.classList.add('bg-transparent');
        }
      });
    });
  },

  /**
   * Initialize user profile menu
   */
  initUserMenu: function() {
    const userButton = document.querySelector('[data-user-menu-button]');
    const userDropdown = document.querySelector('[data-user-dropdown]');
    
    if (userButton && userDropdown) {
      userButton.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
        userDropdown.classList.toggle('opacity-0');
        userDropdown.classList.toggle('opacity-100');
      });

      document.addEventListener('click', () => {
        userDropdown.classList.add('hidden', 'opacity-0');
        userDropdown.classList.remove('opacity-100');
      });
    }

    // Logout handler
    const logoutButton = document.querySelector('[data-logout-button]');
    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        ZudoUtils.clearSession();
        window.location.href = '../onboarding/login.html';
      });
    }
  },

  /**
   * Initialize date picker
   */
  initDatePicker: function() {
    const dateButton = document.querySelector('[data-date-picker]');
    
    if (dateButton) {
      dateButton.addEventListener('click', () => {
        // In a real app, this would open a date picker
        const today = new Date().toLocaleDateString('en-NG', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        dateButton.innerHTML = `<span class="material-symbols-outlined text-lg">calendar_today</span> ${today}`;
      });
    }
  },

  /**
   * Initialize data tables
   */
  initDataTable: function(tableSelector) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    const searchInput = document.querySelector('[data-table-search]');
    const sortHeaders = table.querySelectorAll('th[data-sort]');

    // Search within table
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    // Sort columns
    sortHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const key = header.dataset.sort;
        const direction = header.dataset.direction === 'asc' ? 'desc' : 'asc';
        
        const sortedRows = Array.from(rows).sort((a, b) => {
          const aVal = a.querySelector(`[data-sort="${key}"]`)?.textContent || '';
          const bVal = b.querySelector(`[data-sort="${key}"]`)?.textContent || '';
          return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });

        sortedRows.forEach(row => table.querySelector('tbody').appendChild(row));
        
        header.dataset.direction = direction;
      });
    });
  },

  /**
   * Initialize action buttons
   */
  initActionButtons: function() {
    const actionButtons = document.querySelectorAll('[data-action]');
    
    actionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = button.dataset.action;
        this.handleAction(action, button);
      });
    });
  },

  /**
   * Handle action button clicks
   */
  handleAction: function(action, button) {
    switch(action) {
      case 'export':
        ZudoUtils.showToast('Exporting data...', 'info');
        break;
      case 'refresh':
        location.reload();
        break;
      case 'filter':
        // Toggle filter dropdown
        const filterDropdown = document.querySelector('[data-filter-dropdown]');
        if (filterDropdown) {
          filterDropdown.classList.toggle('hidden');
        }
        break;
      default:
        console.log('Action:', action);
    }
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  ZudoDashboard.init();
});