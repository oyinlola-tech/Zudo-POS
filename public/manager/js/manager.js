/**
 * Zudo POS - Manager Module
 * Specific functionality for manager dashboard
 */

const ZudoManager = {
  /**
   * Initialize manager dashboard
   */
  init: function() {
    this.initLiveMonitor();
    this.initShiftManagement();
    this.initReports();
  },

  /**
   * Initialize live monitor
   */
  initLiveMonitor: function() {
    const refreshButton = document.querySelector('[data-refresh-monitor]');
    
    if (refreshButton) {
      refreshButton.addEventListener('click', () => {
        this.refreshLiveData();
      });
    }

    // Auto-refresh every 30 seconds
    setInterval(() => {
      this.refreshLiveData();
    }, 30000);
  },

  /**
   * Refresh live data
   */
  refreshLiveData: function() {
    console.log('Refreshing live monitor data...');
    // In real app, would fetch from API
    const lastUpdate = document.querySelector('[data-last-update]');
    if (lastUpdate) {
      lastUpdate.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }
  },

  /**
   * Initialize shift management
   */
  initShiftManagement: function() {
    const startShiftButton = document.querySelector('[data-start-shift]');
    const endShiftButton = document.querySelector('[data-end-shift]');
    const shiftModal = document.querySelector('[data-shift-modal]');

    if (startShiftButton) {
      startShiftButton.addEventListener('click', () => {
        this.startShift();
      });
    }

    if (endShiftButton) {
      endShiftButton.addEventListener('click', () => {
        if (shiftModal) {
          shiftModal.classList.remove('hidden');
        }
      });
    }

    // Shift summary
    const cashConfirmButton = document.querySelector('[data-confirm-cash]');
    if (cashConfirmButton) {
      cashConfirmButton.addEventListener('click', () => {
        this.endShift();
      });
    }
  },

  /**
   * Start shift
   */
  startShift: function() {
    const shiftData = {
      startTime: Date.now(),
      startedBy: localStorage.getItem('zudo_user') || 'Manager',
      branch: ZudoUtils.getBranch()
    };
    localStorage.setItem('zudo_shift', JSON.stringify(shiftData));
    ZudoUtils.showToast('Shift started', 'success');
    
    // Update UI
    const startButton = document.querySelector('[data-start-shift]');
    const endButton = document.querySelector('[data-end-shift]');
    if (startButton) startButton.classList.add('hidden');
    if (endButton) endButton.classList.remove('hidden');
  },

  /**
   * End shift
   */
  endShift: function() {
    localStorage.removeItem('zudo_shift');
    ZudoUtils.showToast('Shift ended', 'success');
    
    // Update UI
    window.location.href = '../onboarding/login.html';
  },

  /**
   * Initialize reports
   */
  initReports: function() {
    const generateButton = document.querySelector('[data-generate-report]');
    const exportButton = document.querySelector('[data-export-report]');

    if (generateButton) {
      generateButton.addEventListener('click', () => {
        this.generateReport();
      });
    }

    if (exportButton) {
      exportButton.addEventListener('click', () => {
        this.exportReport();
      });
    }
  },

  /**
   * Generate report
   */
  generateReport: function() {
    ZudoUtils.showToast('Generating report...', 'info');
    // In real app, would fetch report data
  },

  /**
   * Export report
   */
  exportReport: function() {
    ZudoUtils.showToast('Exporting report...', 'info');
    // In real app, would download file
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-manager]')) {
    ZudoManager.init();
  }
});