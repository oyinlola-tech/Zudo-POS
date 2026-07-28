export declare function sendEmail(options: {
    to: string;
    subject: string;
    text: string;
    html?: string;
}): Promise<void>;
export declare function sendOtpEmail(to: string, code: string, type: string): Promise<void>;
//# sourceMappingURL=email.job.d.ts.map