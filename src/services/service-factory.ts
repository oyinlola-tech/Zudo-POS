import {
  RegisterCommand, LoginCommand,
  SendOtpCommand, VerifyOtpCommand,
  ForgotPasswordCommand, ResetPasswordCommand,
  ChangePasswordCommand, ChangePinCommand,
  ForgotPinCommand, SetupPinCommand, AdminChangeStaffPinCommand,
  GetSessionQuery, GetProfileQuery,
} from './auth/index.js'
import { ChangePlanCommand, GenerateInvoiceCommand, CancelPlanCommand, GetPlanQuery, ListInvoicesQuery, GetInvoiceQuery } from './billing/index.js'
import {
  GeneratePaymentQrCommand, ConfirmCryptoPaymentCommand,
  GetCryptoRateCommand, GetWalletsQuery, UpsertWalletQuery,
} from './crypto/index.js'
import { SendOtpMailCommand, SendCustomEmailCommand, SendBulkEmailCommand, MailStatusQuery, EmailLogsQuery } from './mail/index.js'
import { StartShiftCommand, EndShiftCommand, GetActiveShiftQuery, GetShiftHistoryQuery } from './shift/index.js'
import { CreateProductCommand, UpdateProductCommand, DeleteProductCommand, ListProductsQuery, GetProductQuery, SearchProductsQuery, GetInventoryStatsQuery } from './product/index.js'
import { CreateSaleCommand, VoidSaleCommand, ListSalesQuery, GetSaleQuery, GetSaleStatsQuery } from './sale/index.js'
import { CreateCustomerCommand, UpdateCustomerCommand, DeleteCustomerCommand, ListCustomersQuery, GetCustomerQuery, CustomerStatsQuery } from './customer/index.js'
import { CreateStaffCommand, UpdateStaffCommand, DeleteStaffCommand, ListStaffQuery, GetStaffQuery } from './staff/index.js'
import { DashboardQuery, BranchPerformanceQuery } from './analytics/index.js'
import { GetSettingsQuery, GetBranchesQuery, GetLoyaltyConfigQuery, GetLoyaltyActivityQuery, UpdateSettingsCommand } from './settings/index.js'
import { ProcessReturnCommand, ApproveReturnCommand, RejectReturnCommand, ListReturnsQuery, GetReturnQuery } from './returns/index.js'
import { ListBusinessesQuery, GetBusinessQuery, GetRevenueStatsQuery, UpdateBusinessCommand, CreateBusinessCommand, DeleteBusinessCommand } from './admin/index.js'
import { ListAuditLogsQuery, GetAuditLogQuery, AuditLogStatsQuery, ExportAuditLogsQuery } from './audit-log/index.js'
import { ListRolesQuery, GetRoleQuery, CreateRoleCommand, UpdateRoleCommand, DeleteRoleCommand } from './roles/index.js'
import { ListPlansQuery, GetPlanQuery as BillingGetPlanQuery, ListInvoicesQuery as BillingListInvoicesQuery, GetInvoiceQuery as BillingGetInvoiceQuery, GetSubscriptionStatsQuery, CreatePlanCommand, UpdatePlanCommand } from './billing-plans/index.js'
import { GetNotificationsQuery, GetUnreadCountQuery, GetBroadcastHistoryQuery } from './notification/index.js'
import { MarkNotificationReadCommand, MarkAllNotificationsReadCommand, BroadcastNotificationCommand, CreateNotificationCommand, UpdateNotificationSettingsCommand } from './notification/index.js'
import { ListLoyaltyQuery, GetLoyaltyQuery, UpdateTierCommand } from './loyalty/index.js'
import { GetReportQuery, ListReportsQuery, ExportReportQuery, ScheduleReportCommand } from './reports/index.js'
import {
  CreateExpenseCommand, UpdateExpenseCommand, DeleteExpenseCommand,
  ListExpensesQuery, GetExpenseQuery,
} from './expense/index.js'
import {
  CreateSupplierCommand, UpdateSupplierCommand, DeleteSupplierCommand,
  ListSuppliersQuery, GetSupplierQuery,
} from './supplier/index.js'
import {
  CreatePurchaseOrderCommand, UpdatePurchaseOrderCommand, DeletePurchaseOrderCommand,
  ReceivePurchaseOrderCommand, CancelPurchaseOrderCommand,
  ListPurchaseOrdersQuery, GetPurchaseOrderQuery,
} from './purchase-order/index.js'
import {
  CreateTaxCommand, UpdateTaxCommand, DeleteTaxCommand,
  ListTaxesQuery, GetTaxQuery,
} from './tax/index.js'
import {
  CreateDiscountCommand, UpdateDiscountCommand, DeleteDiscountCommand,
  ListDiscountsQuery, GetDiscountQuery,
} from './discount/index.js'

export const authService = {
  commands: {
    register: new RegisterCommand(),
    login: new LoginCommand(),
    sendOtp: new SendOtpCommand(),
    verifyOtp: new VerifyOtpCommand(),
    forgotPassword: new ForgotPasswordCommand(),
    resetPassword: new ResetPasswordCommand(),
    changePassword: new ChangePasswordCommand(),
    changePin: new ChangePinCommand(),
    forgotPin: new ForgotPinCommand(),
    setupPin: new SetupPinCommand(),
    adminChangeStaffPin: new AdminChangeStaffPinCommand(),
  },
  queries: { getSession: new GetSessionQuery(), getProfile: new GetProfileQuery() },
}

export const billingService = {
  commands: {
    changePlan: new ChangePlanCommand(),
    generateInvoice: new GenerateInvoiceCommand(),
    cancelPlan: new CancelPlanCommand(),
  },
  queries: {
    getPlan: new GetPlanQuery(),
    listInvoices: new ListInvoicesQuery(),
    getInvoice: new GetInvoiceQuery(),
  },
}

export const cryptoService = {
  commands: {
    generatePaymentQr: new GeneratePaymentQrCommand(),
    confirmCryptoPayment: new ConfirmCryptoPaymentCommand(),
    getCryptoRate: new GetCryptoRateCommand(),
  },
  queries: { getWallets: new GetWalletsQuery(), upsertWallet: new UpsertWalletQuery() },
}

export const mailService = {
  commands: {
    sendOtpMail: new SendOtpMailCommand(),
    sendCustomEmail: new SendCustomEmailCommand(),
    sendBulkEmail: new SendBulkEmailCommand(),
  },
  queries: { mailStatus: new MailStatusQuery(), emailLogs: new EmailLogsQuery() },
}

export const shiftService = {
  commands: { startShift: new StartShiftCommand(), endShift: new EndShiftCommand() },
  queries: { getActiveShift: new GetActiveShiftQuery(), getShiftHistory: new GetShiftHistoryQuery() },
}

export const productService = {
  commands: {
    create: new CreateProductCommand(),
    update: new UpdateProductCommand(),
    delete: new DeleteProductCommand(),
  },
  queries: {
    list: new ListProductsQuery(),
    get: new GetProductQuery(),
    search: new SearchProductsQuery(),
    inventoryStats: new GetInventoryStatsQuery(),
  },
}

export const saleService = {
  commands: {
    create: new CreateSaleCommand(),
    void: new VoidSaleCommand(),
  },
  queries: {
    list: new ListSalesQuery(),
    get: new GetSaleQuery(),
    stats: new GetSaleStatsQuery(),
  },
}

export const customerService = {
  commands: {
    create: new CreateCustomerCommand(),
    update: new UpdateCustomerCommand(),
    delete: new DeleteCustomerCommand(),
  },
  queries: {
    list: new ListCustomersQuery(),
    get: new GetCustomerQuery(),
    stats: new CustomerStatsQuery(),
  },
}

export const staffService = {
  commands: {
    create: new CreateStaffCommand(),
    update: new UpdateStaffCommand(),
    delete: new DeleteStaffCommand(),
  },
  queries: {
    list: new ListStaffQuery(),
    get: new GetStaffQuery(),
  },
}

export const analyticsService = {
  queries: {
    dashboard: new DashboardQuery(),
    branchPerformance: new BranchPerformanceQuery(),
  },
}

export const settingsService = {
  commands: {
    updateSettings: new UpdateSettingsCommand(),
  },
  queries: {
    getSettings: new GetSettingsQuery(),
    getBranches: new GetBranchesQuery(),
    getLoyaltyConfig: new GetLoyaltyConfigQuery(),
    getLoyaltyActivity: new GetLoyaltyActivityQuery(),
  },
}

export const returnsService = {
  commands: {
    processReturn: new ProcessReturnCommand(),
    approveReturn: new ApproveReturnCommand(),
    rejectReturn: new RejectReturnCommand(),
  },
  queries: {
    listReturns: new ListReturnsQuery(),
    getReturn: new GetReturnQuery(),
  },
}

export const adminService = {
  commands: {
    updateBusiness: new UpdateBusinessCommand(),
    createBusiness: new CreateBusinessCommand(),
    deleteBusiness: new DeleteBusinessCommand(),
  },
  queries: {
    listBusinesses: new ListBusinessesQuery(),
    getBusiness: new GetBusinessQuery(),
    revenueStats: new GetRevenueStatsQuery(),
  },
}

export const auditLogService = {
  queries: {
    list: new ListAuditLogsQuery(),
    get: new GetAuditLogQuery(),
    stats: new AuditLogStatsQuery(),
    export: new ExportAuditLogsQuery(),
  },
}

export const rolesService = {
  commands: {
    create: new CreateRoleCommand(),
    update: new UpdateRoleCommand(),
    delete: new DeleteRoleCommand(),
  },
  queries: {
    list: new ListRolesQuery(),
    get: new GetRoleQuery(),
  },
}

export const billingPlansService = {
  commands: {
    createPlan: new CreatePlanCommand(),
    updatePlan: new UpdatePlanCommand(),
  },
  queries: {
    listPlans: new ListPlansQuery(),
    getPlan: new BillingGetPlanQuery(),
    listInvoices: new BillingListInvoicesQuery(),
    getInvoice: new BillingGetInvoiceQuery(),
    getSubscriptionStats: new GetSubscriptionStatsQuery(),
  },
}

export const notificationService = {
  commands: {
    markRead: new MarkNotificationReadCommand(),
    markAllRead: new MarkAllNotificationsReadCommand(),
    broadcast: new BroadcastNotificationCommand(),
    create: new CreateNotificationCommand(),
    updateSettings: new UpdateNotificationSettingsCommand(),
  },
  queries: {
    getNotifications: new GetNotificationsQuery(),
    getUnreadCount: new GetUnreadCountQuery(),
    getBroadcastHistory: new GetBroadcastHistoryQuery(),
  },
}

export const loyaltyService = {
  queries: {
    list: new ListLoyaltyQuery(),
    get: new GetLoyaltyQuery(),
  },
  commands: {
    updateTier: new UpdateTierCommand(),
  },
}

export const reportsService = {
  queries: {
    getReport: new GetReportQuery(),
    list: new ListReportsQuery(),
    export: new ExportReportQuery(),
  },
  commands: {
    schedule: new ScheduleReportCommand(),
  },
}

export const expenseService = {
  commands: {
    create: new CreateExpenseCommand(),
    update: new UpdateExpenseCommand(),
    delete: new DeleteExpenseCommand(),
  },
  queries: {
    list: new ListExpensesQuery(),
    get: new GetExpenseQuery(),
  },
}

export const supplierService = {
  commands: {
    create: new CreateSupplierCommand(),
    update: new UpdateSupplierCommand(),
    delete: new DeleteSupplierCommand(),
  },
  queries: {
    list: new ListSuppliersQuery(),
    get: new GetSupplierQuery(),
  },
}

export const purchaseOrderService = {
  commands: {
    create: new CreatePurchaseOrderCommand(),
    update: new UpdatePurchaseOrderCommand(),
    delete: new DeletePurchaseOrderCommand(),
    receive: new ReceivePurchaseOrderCommand(),
    cancel: new CancelPurchaseOrderCommand(),
  },
  queries: {
    list: new ListPurchaseOrdersQuery(),
    get: new GetPurchaseOrderQuery(),
  },
}

export const taxService = {
  commands: {
    create: new CreateTaxCommand(),
    update: new UpdateTaxCommand(),
    delete: new DeleteTaxCommand(),
  },
  queries: {
    list: new ListTaxesQuery(),
    get: new GetTaxQuery(),
  },
}

export const discountService = {
  commands: {
    create: new CreateDiscountCommand(),
    update: new UpdateDiscountCommand(),
    delete: new DeleteDiscountCommand(),
  },
  queries: {
    list: new ListDiscountsQuery(),
    get: new GetDiscountQuery(),
  },
}
