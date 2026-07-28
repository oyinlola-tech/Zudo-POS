import { getDb } from '../databases/index.js'

export const analyticsRepository = {
  async getDashboard(businessId: string) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [totalSales, totalRevenue, todaySales, todayRevenue, totalCustomers, totalProducts, lowStock, topProducts] = await Promise.all([
      getDb().sale.count({ where: { businessId, status: 'COMPLETED' } }),
      getDb().sale.aggregate({ where: { businessId, status: 'COMPLETED' }, _sum: { total: true } }),
      getDb().sale.count({ where: { businessId, status: 'COMPLETED', createdAt: { gte: today } } }),
      getDb().sale.aggregate({ where: { businessId, status: 'COMPLETED', createdAt: { gte: today } }, _sum: { total: true } }),
      getDb().customer.count({ where: { businessId, isActive: true } }),
      getDb().product.count({ where: { businessId, isActive: true } }),
      getDb().product.count({ where: { businessId, isActive: true, stock: { lte: getDb().product.fields.lowStockQty } } }),
      getDb().saleItem.groupBy({
        by: ['productId'],
        where: { sale: { businessId, status: 'COMPLETED' } },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 10,
      }),
    ])

    const topProductIds = topProducts.map(tp => tp.productId)
    const products = topProductIds.length > 0
      ? await getDb().product.findMany({ where: { id: { in: topProductIds } }, select: { id: true, name: true, price: true, image: true } })
      : []

    return {
      totalSales,
      totalRevenue: totalRevenue._sum.total ?? 0,
      todaySales,
      todayRevenue: todayRevenue._sum.total ?? 0,
      totalCustomers,
      totalProducts,
      lowStockCount: lowStock,
      topProducts: topProducts.map(tp => {
        const product = products.find(p => p.id === tp.productId)
        return { id: tp.productId, name: product?.name ?? 'Unknown', price: product?.price ?? 0, image: product?.image ?? null, totalSold: tp._sum.quantity ?? 0 }
      }),
    }
  },

  async getBranchPerformance(businessId: string) {
    const users = await getDb().user.findMany({
      where: { businessId, isActive: true },
      select: { id: true, firstName: true, lastName: true },
    })
    const performance = await Promise.all(users.map(async (user) => {
      const [salesCount, revenue] = await Promise.all([
        getDb().sale.count({ where: { userId: user.id, businessId, status: 'COMPLETED' } }),
        getDb().sale.aggregate({ where: { userId: user.id, businessId, status: 'COMPLETED' }, _sum: { total: true } }),
      ])
      return { userId: user.id, name: `${user.firstName} ${user.lastName}`, salesCount, revenue: revenue._sum.total ?? 0 }
    }))
    return performance.sort((a, b) => b.revenue - a.revenue)
  },
}