/**
 * Zudo POS - Navigation Module
 * Handles sidebar navigation, active states, and mobile menu
 */

const ZudoNav = {
  /**
   * Initialize navigation
   */
  init: function() {
    this.setActiveNavItem();
    this.initMobileMenu();
    this.initSidebarCollapse();
  },

  /**
   * Set active navigation item based on current page
   */
  setActiveNavItem: function() {
    const currentPage = ZudoUtils.getCurrentPage();
    const navLinks = document.querySelectorAll('[data-nav]');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPage || href === './' + currentPage)) {
        link.classList.add('active');
        link.classList.remove('text-slate-400', 'text-slate-500');
        link.classList.add('text-white', 'bg-emerald-500/10', 'border-l-4', 'border-emerald-500');
      }
    });

    // Also check sidebar links by href matching
    const sidebarLinks = document.querySelectorAll('aside nav a[href]');
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        // Remove active classes from siblings
        link.parentElement.querySelectorAll('a').forEach(sibling => {
          sibling.classList.remove('bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500', 'border-l-4');
          sibling.classList.add('text-slate-400', 'hover:text-white');
        });
        // Add active to current
        link.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border-l-4', 'border-emerald-500');
        link.classList.remove('text-slate-400', 'hover:text-white');
      }
    });
  },

  /**
   * Initialize mobile menu toggle
   */
  initMobileMenu: function() {
    const menuButton = document.querySelector('[data-menu-toggle]');
    const sidebar = document.querySelector('aside');
    const overlay = document.querySelector('[data-sidebar-overlay]');
    
    if (menuButton && sidebar) {
      menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        sidebar.classList.toggle('translate-x-0');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
      });
    }
  },

  /**
   * Initialize sidebar collapse for smaller screens
   */
  initSidebarCollapse: function() {
    const collapseButton = document.querySelector('[data-sidebar-collapse]');
    
    if (collapseButton) {
      collapseButton.addEventListener('click', () => {
        const sidebar = document.querySelector('aside');
        if (sidebar) {
          sidebar.classList.toggle('collapsed');
        }
      });
    }
  },

  /**
   * Handle branch selector dropdown
   */
  initBranchSelector: function() {
    const branchButton = document.querySelector('[data-branch-selector]');
    const dropdown = document.querySelector('[dataBranchDropdown]');
    const options = dropdown?.querySelectorAll('button');
    
    if (branchButton && dropdown && options) {
      branchButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      options.forEach(option => {
        option.addEventListener('click', () => {
          const branch = option.textContent.trim();
          ZudoUtils.setBranch(branch);
          branchButton.innerHTML = `${branch} <span class="material-symbols-outlined text-sm">expand_more</span>`;
          dropdown.classList.add('hidden');
          // Reload page to apply branch change
          location.reload();
        });
      });

      document.addEventListener('click', () => {
        dropdown.classList.add('hidden');
      });
    }
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ZudoNav.init();
});