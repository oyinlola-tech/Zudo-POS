import type { FastifyInstance } from 'fastify'
import { getDb } from '../databases/index.js'

export async function registerPublicRoutes(fastify: FastifyInstance) {
  fastify.get('/api/public/pricing', async () => {
    const plans = [
      { name: 'Free', price: '₦0', features: ['1 branch', '2 staff', 'Basic reports', 'Community support'], popular: false },
      { name: 'Starter', price: '₦15,000/mo', features: ['2 branches', '10 staff', 'Sales analytics', 'Email support'], popular: false },
      { name: 'Professional', price: '₦35,000/mo', features: ['5 branches', 'Unlimited staff', 'Inventory management', 'Priority support', 'API access'], popular: true },
      { name: 'Enterprise', price: 'Custom', features: ['Unlimited branches', 'Unlimited staff', 'Dedicated support', 'Custom integrations', 'SLA'], popular: false },
    ]
    return { plans }
  })

  fastify.get('/api/public/features', async () => ({
    features: [
      { title: 'POS Terminal', description: 'Fast, intuitive point-of-sale interface with barcode scanning and touchscreen support' },
      { title: 'Inventory Management', description: 'Real-time stock tracking, low-stock alerts, and multi-warehouse support' },
      { title: 'Customer Management', description: 'CRM with purchase history, loyalty points, and targeted promotions' },
      { title: 'Staff Management', description: 'Role-based access, shift management, and performance tracking' },
      { title: 'Sales Analytics', description: 'Comprehensive reports and dashboards with real-time insights' },
      { title: 'Multi-branch', description: 'Manage multiple locations from a single dashboard with centralized reporting' },
      { title: 'Crypto Payments', description: 'Accept Bitcoin, Ethereum, USDT and more with QR code payments' },
      { title: 'Offline Mode', description: 'Continue selling even when internet goes down with automatic sync' },
    ],
  }))

  fastify.get('/api/public/stats', async () => ({
    businesses: 1500,
    transactions: 250000,
    activeUsers: 4200,
    uptime: 99.9,
    countries: 12,
    satisfaction: 98,
  }))

  fastify.get('/api/public/testimonials', async () => ({
    testimonials: [
      { name: 'Chidi Okonkwo', business: 'Lagos Fresh Market', text: 'Zudo POS transformed how we manage our grocery store. The inventory tracking alone saved us hours every week.', rating: 5 },
      { name: 'Amara Obi', business: 'Amara Fashion House', text: 'The crypto payment feature is a game-changer. Our international customers love being able to pay with USDT.', rating: 5 },
      { name: 'Tunde Balogun', business: 'Tunde\'s Grill', text: 'Setting up was incredibly easy. Within an hour we were processing our first sale. The support team is amazing.', rating: 5 },
    ],
  }))

  fastify.get('/api/public/contact', async () => ({
    email: 'hello@zudo.app',
    phone: '+234 800 ZUDO',
    address: 'Lagos, Nigeria',
    social: { twitter: '@zudo_pos', instagram: '@zudo_pos', linkedin: 'zudo-pos' },
  }))

  fastify.get('/api/public/resources', async () => ({
    resources: [
      { title: 'Getting Started Guide', type: 'guide', url: '/documentation' },
      { title: 'API Documentation', type: 'docs', url: '/documentation' },
      { title: 'Video Tutorials', type: 'video', url: '/resources' },
      { title: 'FAQ', type: 'faq', url: '/resources' },
    ],
  }))

  fastify.get('/api/public/solutions', async () => ({
    solutions: [
      { industry: 'Retail', description: 'Perfect for fashion, electronics, and general retail stores' },
      { industry: 'Restaurant', description: 'Table management, kitchen display, and split billing' },
      { industry: 'Grocery', description: 'Fast barcode scanning, expiry tracking, and bulk pricing' },
      { industry: 'Pharmacy', description: 'Prescription tracking, expiry management, and regulatory compliance' },
    ],
  }))

  fastify.get('/api/public/demo', async () => ({
    demoUrl: '/register',
    features: ['Full POS interface', 'All reports', 'Staff management', 'Inventory tools'],
  }))
}