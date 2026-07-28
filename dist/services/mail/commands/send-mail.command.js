import { sendEmail } from '../../../jobs/email.job.js';
export class SendOtpMailCommand {
    async execute(input) {
        const typeLabels = {
            password_reset: 'Password Reset',
            pin_reset: 'PIN Reset',
            pin_change: 'PIN Change',
            email_verification: 'Email Verification',
        };
        const label = typeLabels[input.type] || 'Verification';
        const text = `Your ${label.toLowerCase()} code is: ${input.code}\n\nThis code expires in 10 minutes.`;
        await sendEmail({
            to: input.to,
            subject: `Zudo POS — ${label} Code`,
            text,
        });
    }
}
//# sourceMappingURL=send-mail.command.js.map