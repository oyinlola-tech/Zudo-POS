const ZudoCashier = {
  cart: [],
  currentShift: null,

  init: function() {
    this.initCart();
    this.initProductSearch();
    this.initCheckout();
    this.checkShift();
    this.loadProducts();
  },

  loadProducts: async function(category) {
    const params = category ? `?category=${encodeURIComponent(category)}` : ''
    try {
      const data = await CashierAPI.getProducts(params)
      const products = data.items || []
      this.renderProducts(products)
    } catch (err) {
      console.error('Failed to load products', err)
    }
  },

  renderProducts: function(products) {
    const grid = document.querySelector('[data-list="products"]')
    if (!grid) return
    const template = grid.querySelector('template')
    if (!template) return

    grid.innerHTML = ''
    products.forEach(product => {
      const clone = template.content.cloneNode(true)
      const div = clone.querySelector('div')

      const img = div.querySelector('[data-attr*="src:image"]')
      if (img) img.src = product.image || 'https://via.placeholder.com/200'

      const nameEl = div.querySelector('[data-text="name"]')
      if (nameEl) nameEl.textContent = product.name

      const categoryEl = div.querySelector('[data-text="category"]')
      if (categoryEl) categoryEl.textContent = product.category || 'General'

      const priceEl = div.querySelector('[data-text="price"]')
      if (priceEl) priceEl.textContent = Number(product.price).toLocaleString()

      div.dataset.productId = product.id
      div.dataset.productName = product.name
      div.dataset.productPrice = product.price

      div.addEventListener('click', () => {
        this.addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
      })

      grid.appendChild(clone.firstElementChild || clone)
    })
  },

  initCart: function() {
    this.updateCartDisplay();
    const clearButton = document.querySelector('[data-clear-cart]');
    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearCart());
    }
  },

  addToCart: function(product, quantity = 1) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
    this.updateCartDisplay();
    ZudoUtils.showToast(`Added ${product.name} to cart`, 'success');
  },

  removeFromCart: function(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartDisplay();
  },

  updateQuantity: function(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.updateCartDisplay();
    }
  },

  clearCart: function() {
    if (confirm('Clear all items from cart?')) {
      this.cart = [];
      this.updateCartDisplay();
      ZudoUtils.showToast('Cart cleared', 'info');
    }
  },

  getCartTotal: function() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotalItems: function() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  },

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

    if (cartTotal) cartTotal.textContent = `₦${this.getCartTotal().toLocaleString()}`;
    if (cartCount) cartCount.textContent = this.getTotalItems();
    if (emptyMessage) emptyMessage.classList.toggle('hidden', this.cart.length > 0);
  },

  initProductSearch: function() {
    const searchInput = document.querySelector('[data-product-search]');
    if (searchInput) {
      let timeout
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => this.searchProducts(e.target.value), 200)
      })
      searchInput.addEventListener('blur', () => {
        setTimeout(() => {
          const dropdown = document.querySelector('[data-search-results]')
          if (dropdown) dropdown.classList.add('hidden')
        }, 200)
      })
      searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 1) {
          this.searchProducts(searchInput.value)
        }
      })
    }
  },

  searchProducts: async function(query) {
    const dropdown = document.querySelector('[data-search-results]')
    if (!dropdown) return

    if (!query || query.length < 1) {
      dropdown.classList.add('hidden')
      return
    }

    try {
      const data = await CashierAPI.searchProducts(query)
      const products = data.items || []

      if (products.length === 0) {
        dropdown.innerHTML = '<div class="p-4 text-sm text-on-surface-variant text-center">No products found</div>'
        dropdown.classList.remove('hidden')
        return
      }

      dropdown.innerHTML = products.map(p => `
        <div class="flex items-center gap-3 p-3 hover:bg-surface-container-low cursor-pointer border-b border-outline-variant/5 last:border-0" data-search-result data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">
          <img class="w-10 h-10 rounded-lg object-cover bg-surface-container" src="${p.image || 'https://via.placeholder.com/40'}" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">${p.name}</p>
            <p class="text-xs text-on-surface-variant">SKU: ${p.sku || 'N/A'} · Stock: ${p.stock}</p>
          </div>
          <span class="text-sm font-bold text-surface-tint">₦${Number(p.price).toLocaleString()}</span>
        </div>
      `).join('')

      dropdown.querySelectorAll('[data-search-result]').forEach(el => {
        el.addEventListener('mousedown', (e) => {
          e.preventDefault()
          this.addToCart({ id: el.dataset.id, name: el.dataset.name, price: parseFloat(el.dataset.price) })
          dropdown.classList.add('hidden')
          document.querySelector('[data-product-search]').value = ''
        })
      })

      dropdown.classList.remove('hidden')
    } catch (err) {
      console.error('Search failed', err)
    }
  },

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

    const paymentButtons = document.querySelectorAll('[data-payment-method]');
    paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        const method = button.dataset.paymentMethod;
        this.processPayment(method);
      });
    });
  },

  showPaymentModal: function() {
    const modal = document.querySelector('[data-payment-modal]');
    if (modal) modal.classList.remove('hidden');
  },

  processPayment: async function(method) {
    const total = this.getCartTotal();
    if (this.cart.length === 0) return

    const items = this.cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price,
      total: item.price * item.quantity,
    }))

    try {
      const result = await CashierAPI.createTransaction({
        subtotal: total,
        total: total,
        paymentMethod: method,
        items,
      })
      ZudoUtils.showToast(`Payment of ₦${total.toLocaleString()} completed! Ref: ${result.reference}`, 'success')
      this.cart = [];
      this.updateCartDisplay();
    } catch (err) {
      ZudoUtils.showToast('Payment failed: ' + err.message, 'error')
    }

    const modal = document.querySelector('[data-payment-modal]');
    if (modal) modal.classList.add('hidden');
  },

  checkShift: async function() {
    try {
      const data = await CashierAPI.getShift()
      if (data && data.shift) {
        this.currentShift = data.shift
        localStorage.setItem('zudo_shift', JSON.stringify(data.shift))
      } else {
        localStorage.removeItem('zudo_shift')
        const shiftLink = document.querySelector('[data-shift-link]');
        if (shiftLink && !window.location.pathname.includes('shift.html')) {
          ZudoUtils.showToast('Please start a shift first', 'error');
        }
      }
    } catch (err) {
      console.error('Shift check failed', err)
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-cashier]')) {
    ZudoCashier.init();
  }
});