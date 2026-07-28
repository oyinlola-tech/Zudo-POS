import {
  RegisterCommand, LoginCommand,
  SendOtpCommand, VerifyOtpCommand,
  ForgotPasswordCommand, ResetPasswordCommand,
  ChangePasswordCommand, ChangePinCommand,
  ForgotPinCommand, SetupPinCommand, AdminChangeStaffPinCommand,
  GetSessionQuery, GetProfileQuery,
} from './auth/index.js'
import { ChangePlanCommand, GenerateInvoiceCommand, GetPlanQuery } from './billing/index.js'
import {
  GeneratePaymentQrCommand, ConfirmCryptoPaymentCommand,
  GetCryptoRateCommand, GetWalletsQuery, UpsertWalletQuery,
} from './crypto/index.js'
import { SendOtpMailCommand, MailStatusQuery } from './mail/index.js'
import { StartShiftCommand, EndShiftCommand, GetActiveShiftQuery, GetShiftHistoryQuery } from './shift/index.js'
import { CreateProductCommand, UpdateProductCommand, DeleteProductCommand, ListProductsQuery, GetProductQuery, SearchProductsQuery, GetInventoryStatsQuery } from './product/index.js'
import { CreateSaleCommand, VoidSaleCommand, ListSalesQuery, GetSaleQuery, GetSaleStatsQuery } from './sale/index.js'
import { CreateCustomerCommand, UpdateCustomerCommand, ListCustomersQuery, GetCustomerQuery, CustomerStatsQuery } from './customer/index.js'
import { CreateStaffCommand, UpdateStaffCommand, ListStaffQuery, GetStaffQuery } from './staff/index.js'
import { DashboardQuery, BranchPerformanceQuery } from './analytics/index.js'
import { GetSettingsQuery, GetBranchesQuery, GetLoyaltyConfigQuery, GetLoyaltyActivityQuery, UpdateSettingsCommand } from './settings/index.js'
import { ProcessReturnCommand, ListReturnsQuery } from './returns/index.js'
import { ListBusinessesQuery, GetBusinessQuery, GetRevenueStatsQuery, UpdateBusinessCommand } from './admin/index.js'
import { ListAuditLogsQuery } from './audit-log/index.js'
import { ListRolesQuery, CreateRoleCommand } from './roles/index.js'

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
  commands: { changePlan: new ChangePlanCommand(), generateInvoice: new GenerateInvoiceCommand() },
  queries: { getPlan: new GetPlanQuery() },
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
  commands: { sendOtpMail: new SendOtpMailCommand() },
  queries: { mailStatus: new MailStatusQuery() },
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
  },
  queries: {
    listReturns: new ListReturnsQuery(),
  },
}

export const adminService = {
  commands: {
    updateBusiness: new UpdateBusinessCommand(),
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
  },
}

export const rolesService = {
  commands: {
    create: new CreateRoleCommand(),
  },
  queries: {
    list: new ListRolesQuery(),
  },
}