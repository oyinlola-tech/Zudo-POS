/**
 * Zudo POS - Cashier Module
 * Specific functionality for cashier/POS terminal
 */

const ZudoCashier = {
  cart: [],
  currentShift: null,

  /**
   * Initialize cashier dashboard
   */
  init: function() {
    this.initCart();
    this.initProductSearch();
    this.initCheckout();
    this.checkShift();
  },

  /**
   * Initialize cart
   */
  initCart: function() {
    this.updateCartDisplay();

    const clearButton = document.querySelector('[data-clear-cart]');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        this.clearCart();
      });
    }
  },

  /**
   * Add to cart
   */
  addToCart: function(product, quantity = 1) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity: quantity
      });
    }

    this.updateCartDisplay();
    ZudoUtils.showToast(`Added ${product.name} to cart`, 'success');
  },

  /**
   * Remove from cart
   */
  removeFromCart: function(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartDisplay();
  },

  /**
   * Update cart item quantity
   */
  updateQuantity: function(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.updateCartDisplay();
    }
  },

  /**
   * Clear cart
   */
  clearCart: function() {
    if (confirm('Clear all items from cart?')) {
      this.cart = [];
      this.updateCartDisplay();
      ZudoUtils.showToast('Cart cleared', 'info');
    }
  },

  /**
   * Get cart total
   */
  getCartTotal: function() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  /**
   * Get total items
   */
  getTotalItems: function() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * Update cart display
   */
  updateCartDisplay: function() {
    const cartItems = document.querySelector('[data-cart-items]');
    const cartTotal = document.querySelector('[data-cart-total]');
    const cartCount = document.querySelector('[data-cart-count]');
    const emptyMessage = document.querySelector('[data-cart-empty]');

    if (cartItems) {
      cartItems.innerHTML = this.cart.map(item => `
        <div class="flex items-center justify-between p-3 border-b border-slate-100">
          <div class="flex-1">
            <p class="font-medium text-sm">${item.name}</p>
            <p class="text-xs text-slate-500">₦${item.price.toLocaleString()} x ${item.quantity}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="text-xs px-2 py-1 bg-slate-100 rounded" onclick="ZudoCashier.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span class="text-sm font-medium">${item.quantity}</span>
            <button class="text-xs px-2 bg-slate-100 rounded" onclick="ZudoCashier.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            <button class="text-red-500 text-xs ml-2" onclick="ZudoCashier.removeFromCart('${item.id}')">
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      `).join('');
    }

    if (cartTotal) {
      cartTotal.textContent = `₦${this.getCartTotal().toLocaleString()}`;
    }

    if (cartCount) {
      cartCount.textContent = this.getTotalItems();
    }

    if (emptyMessage) {
      emptyMessage.classList.toggle('hidden', this.cart.length > 0);
    }
  },

  /**
   * Initialize product search
   */
  initProductSearch: function() {
    const searchInput = document.querySelector('[data-product-search]');
    
    if (searchInput) {
      searchInput.addEventListener('input', ZudoUtils.debounce((e) => {
        this.searchProducts(e.target.value);
      }, 300));
    }

    // Quick add buttons
    const quickAddButtons = document.querySelectorAll('[data-quick-add]');
    quickAddButtons.forEach(button => {
      button.addEventListener('click', () => {
        const product = {
          id: button.dataset.productId,
          name: button.dataset.productName,
          price: parseFloat(button.dataset.productPrice)
        };
        this.addToCart(product);
      });
    });
  },

  /**
   * Search products
   */
  searchProducts: function(query) {
    console.log('Searching products:', query);
    // In real app, would filter products
  },

  /**
   * Initialize checkout
   */
  initCheckout: function() {
    const checkoutButton = document.querySelector('[data-checkout]');
    
    if (checkoutButton) {
      checkoutButton.addEventListener('click', () => {
        if (this.cart.length === 0) {
          ZudoUtils.showToast('Cart is empty', 'error');
          return;
        }
        this.showPaymentModal();
      });
    }

    // Payment method buttons
    const paymentButtons = document.querySelectorAll('[data-payment-method]');
    paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        const method = button.dataset.paymentMethod;
        this.processPayment(method);
      });
    });
  },

  /**
   * Show payment modal
   */
  showPaymentModal: function() {
    const modal = document.querySelector('[data-payment-modal]');
    if (modal) {
      modal.classList.remove('hidden');
    }
  },

  /**
   * Process payment
   */
  processPayment: function(method) {
    console.log('Processing payment:', method);
    const total = this.getCartTotal();
    
    // Save transaction
    const transaction = {
      id: ZudoUtils.generateId(),
      items: this.cart,
      total: total,
      method: method,
      timestamp: Date.now(),
      cashier: localStorage.getItem('zudo_user') || 'Cashier',
      branch: ZudoUtils.getBranch()
    };

    localStorage.setItem(`zudo_transaction_${transaction.id}`, JSON.stringify(transaction));
    
    ZudoUtils.showToast(`Payment of ₦${total.toLocaleString()} processed!`, 'success');
    
    // Reset cart
    this.cart = [];
    this.updateCartDisplay();

    // Close modal
    const modal = document.querySelector('[data-payment-modal]');
    if (modal) modal.classList.add('hidden');
  },

  /**
   * Check shift status
   */
  checkShift: function() {
    const shiftData = localStorage.getItem('zudo_shift');
    if (shiftData) {
      this.currentShift = JSON.parse(shiftData);
    } else {
      // No active shift - redirect to shift page
      const shiftLink = document.querySelector('[data-shift-link]');
      if (shiftLink && !window.location.pathname.includes('shift.html')) {
        ZudoUtils.showToast('Please start a shift first', 'error');
      }
    }
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-cashier]')) {
    ZudoCashier.init();
  }
});