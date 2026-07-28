import { RegisterCommand, LoginCommand, SendOtpCommand, VerifyOtpCommand, ForgotPasswordCommand, ResetPasswordCommand, ChangePasswordCommand, ChangePinCommand, ForgotPinCommand, SetupPinCommand, AdminChangeStaffPinCommand, GetSessionQuery, GetProfileQuery } from './auth/index.js';
import { ChangePlanCommand, GenerateInvoiceCommand, GetPlanQuery } from './billing/index.js';
import { GeneratePaymentQrCommand, ConfirmCryptoPaymentCommand, GetCryptoRateCommand, GetWalletsQuery, UpsertWalletQuery } from './crypto/index.js';
import { SendOtpMailCommand, MailStatusQuery } from './mail/index.js';
import { StartShiftCommand, EndShiftCommand, GetActiveShiftQuery, GetShiftHistoryQuery } from './shift/index.js';
import { CreateProductCommand, UpdateProductCommand, DeleteProductCommand, ListProductsQuery, GetProductQuery, SearchProductsQuery, GetInventoryStatsQuery } from './product/index.js';
import { CreateSaleCommand, VoidSaleCommand, ListSalesQuery, GetSaleQuery, GetSaleStatsQuery } from './sale/index.js';
import { CreateCustomerCommand, UpdateCustomerCommand, ListCustomersQuery, GetCustomerQuery, CustomerStatsQuery } from './customer/index.js';
export declare const authService: {
    commands: {
        register: RegisterCommand;
        login: LoginCommand;
        sendOtp: SendOtpCommand;
        verifyOtp: VerifyOtpCommand;
        forgotPassword: ForgotPasswordCommand;
        resetPassword: ResetPasswordCommand;
        changePassword: ChangePasswordCommand;
        changePin: ChangePinCommand;
        forgotPin: ForgotPinCommand;
        setupPin: SetupPinCommand;
        adminChangeStaffPin: AdminChangeStaffPinCommand;
    };
    queries: {
        getSession: GetSessionQuery;
        getProfile: GetProfileQuery;
    };
};
export declare const billingService: {
    commands: {
        changePlan: ChangePlanCommand;
        generateInvoice: GenerateInvoiceCommand;
    };
    queries: {
        getPlan: GetPlanQuery;
    };
};
export declare const cryptoService: {
    commands: {
        generatePaymentQr: GeneratePaymentQrCommand;
        confirmCryptoPayment: ConfirmCryptoPaymentCommand;
        getCryptoRate: GetCryptoRateCommand;
    };
    queries: {
        getWallets: GetWalletsQuery;
        upsertWallet: UpsertWalletQuery;
    };
};
export declare const mailService: {
    commands: {
        sendOtpMail: SendOtpMailCommand;
    };
    queries: {
        mailStatus: MailStatusQuery;
    };
};
export declare const shiftService: {
    commands: {
        startShift: StartShiftCommand;
        endShift: EndShiftCommand;
    };
    queries: {
        getActiveShift: GetActiveShiftQuery;
        getShiftHistory: GetShiftHistoryQuery;
    };
};
export declare const productService: {
    commands: {
        create: CreateProductCommand;
        update: UpdateProductCommand;
        delete: DeleteProductCommand;
    };
    queries: {
        list: ListProductsQuery;
        get: GetProductQuery;
        search: SearchProductsQuery;
        inventoryStats: GetInventoryStatsQuery;
    };
};
export declare const saleService: {
    commands: {
        create: CreateSaleCommand;
        void: VoidSaleCommand;
    };
    queries: {
        list: ListSalesQuery;
        get: GetSaleQuery;
        stats: GetSaleStatsQuery;
    };
};
export declare const customerService: {
    commands: {
        create: CreateCustomerCommand;
        update: UpdateCustomerCommand;
    };
    queries: {
        list: ListCustomersQuery;
        get: GetCustomerQuery;
        stats: CustomerStatsQuery;
    };
};
//# sourceMappingURL=service-factory.d.ts.map