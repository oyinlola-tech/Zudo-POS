/**
 * Zudo POS - Onboarding Module
 * Handles multi-step onboarding forms and validation
 */

const ZudoOnboarding = {
  currentStep: 0,
  steps: [],

  /**
   * Initialize onboarding
   */
  init: function() {
    this.steps = document.querySelectorAll('[data-step]');
    if (this.steps.length > 0) {
      this.initStepNavigation();
      this.initFormValidation();
      this.loadProgress();
    }
  },

  /**
   * Initialize step navigation
   */
  initStepNavigation: function() {
    const nextButtons = document.querySelectorAll('[data-next]');
    const prevButtons = document.querySelectorAll('[data-prev]');

    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (this.validateCurrentStep()) {
          this.goToNextStep();
        }
      });
    });

    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.goToPrevStep();
      });
    });

    // Step indicators
    const indicators = document.querySelectorAll('[data-step-indicator]');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        if (index < this.currentStep || this.canSkipToStep(index)) {
          this.goToStep(index);
        }
      });
    });
  },

  /**
   * Initialize form validation
   */
  initFormValidation: function() {
    const forms = document.querySelectorAll('[data-validate]');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateInput(input);
        });
        
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateInput(input);
          }
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.validateCurrentStep()) {
          form.submit();
        }
      });
    });
  },

  /**
   * Validate single input
   */
  validateInput: function(input) {
    let isValid = true;
    let errorMessage = '';

    // Check required
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (input.type === 'tel' && input.value) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(input.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Password validation
    if (input.type === 'password') {
      if (input.value.length < 8) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters';
      }
    }

    // Show/hide error
    const errorElement = input.parentElement.querySelector('.error-text');
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.toggle('hidden', isValid);
    }

    input.classList.toggle('error', !isValid);
    input.classList.toggle('border-red-500', !isValid);
    input.classList.toggle('focus:ring-red-500', !isValid);

    return isValid;
  },

  /**
   * Validate current step
   */
  validateCurrentStep: function() {
    const currentStepEl = this.steps[this.currentStep];
    if (!currentStepEl) return true;

    const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
    let allValid = true;

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        allValid = false;
      }
    });

    return allValid;
  },

  /**
   * Go to next step
   */
  goToNextStep: function() {
    if (this.currentStep < this.steps.length - 1) {
      this.saveProgress();
      this.currentStep++;
      this.showStep(this.currentStep);
    } else {
      // Complete onboarding
      this.completeOnboarding();
    }
  },

  /**
   * Go to previous step
   */
  goToPrevStep: function() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  },

  /**
   * Go to specific step
   */
  goToStep: function(stepIndex) {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.currentStep = stepIndex;
      this.showStep(stepIndex);
    }
  },

  /**
   * Show step
   */
  showStep: function(stepIndex) {
    this.steps.forEach((step, index) => {
      step.classList.toggle('hidden', index !== stepIndex);
      step.classList.toggle('active', index === stepIndex);
    });

    // Update progress indicator
    this.updateProgress();

    // Scroll to top
    window.scrollTo(0, 0);
  },

  /**
   * Update progress indicator
   */
  updateProgress: function() {
    const progressBar = document.querySelector('[data-progress-bar]');
    const progressText = document.querySelector('[data-progress-text]');
    
    if (progressBar) {
      const percent = ((this.currentStep + 1) / this.steps.length) * 100;
      progressBar.style.width = `${percent}%`;
    }

    if (progressText) {
      progressText.textContent = `Step ${this.currentStep + 1} of ${this.steps.length}`;
    }
  },

  /**
   * Check if can skip to step
   */
  canSkipToStep: function(stepIndex) {
    // Allow skipping backwards or to completed steps
    return stepIndex <= this.currentStep;
  },

  /**
   * Save progress to localStorage
   */
  saveProgress: function() {
    const formData = {};
    const inputs = document.querySelectorAll('input[name], select[name]');
    
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });

    localStorage.setItem('zudo_onboarding_progress', JSON.stringify({
      currentStep: this.currentStep,
      formData: formData,
      timestamp: Date.now()
    }));
  },

  /**
   * Load progress from localStorage
   */
  loadProgress: function() {
    const saved = localStorage.getItem('zudo_onboarding_progress');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      
      // Only load if less than 24 hours old
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        this.currentStep = data.currentStep || 0;
        this.showStep(this.currentStep);

        // Restore form data
        if (data.formData) {
          Object.keys(data.formData).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
              input.value = data.formData[key];
            }
          });
        }
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
  },

  /**
   * Complete onboarding
   */
  completeOnboarding: function() {
    localStorage.removeItem('zudo_onboarding_progress');
    localStorage.setItem('zudo_onboarded', 'true');
    ZudoUtils.showToast('Onboarding complete!', 'success');
    
    // Redirect based on role
    const role = localStorage.getItem('zudo_role') || 'admin';
    window.location.href = `../${role}/index.html`;
  },

  /**
   * Check if already onboarded
   */
  isOnboarded: function() {
    return localStorage.getItem('zudo_onboarded') === 'true';
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  ZudoOnboarding.init();
});