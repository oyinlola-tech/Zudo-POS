import { getDb } from '../databases/index.js'

const BRAND = {
  primary: '#1b6d24',
  primaryLight: '#88d982',
  primaryBg: '#f0fdf4',
  secondary: '#6f46b9',
  secondaryLight: '#d3bbff',
  secondaryBg: '#f5f0ff',
  background: '#f8f9ff',
  surface: '#ffffff',
  text: '#0d1c2f',
  textMuted: '#45474c',
  outline: '#c6c6cc',
  danger: '#ba1a1a',
  dangerBg: '#ffdad6',
  radius: '12px',
}

function headerHtml(name: string, contactLine: string) {
  return `
    <div style="background: linear-gradient(135deg, ${BRAND.primary} 0%, #2d9e3a 100%); padding: 32px 40px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-family: 'Segoe UI', Arial, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">${name}</h1>
      ${contactLine ? `<p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; line-height: 1.5;">${contactLine}</p>` : ''}
    </div>
  `
}

function footerHtml() {
  return `
    <div style="background: ${BRAND.background}; padding: 20px 40px; text-align: center; border-top: 1px solid ${BRAND.outline};">
      <p style="color: ${BRAND.textMuted}; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.6; margin: 0;">
        Powered by <strong style="color: ${BRAND.primary};">Zudo POS</strong><br/>
        This is an automated message — please do not reply.
      </p>
    </div>
  `
}

interface BusinessInfo { name: string; address: string; phone: string; email: string }

async function getBusinessInfo(businessId: string | null): Promise<BusinessInfo> {
  const info: BusinessInfo = { name: 'Zudo POS', address: '', phone: '', email: '' }
  if (businessId) {
    try {
      const biz = await getDb().business.findUnique({ where: { id: businessId } })
      if (biz) {
        info.name = biz.name
        info.address = biz.address ?? ''
        info.phone = biz.phone ?? ''
        info.email = biz.email ?? ''
      }
    } catch { /* fallback */ }
  }
  return info
}

function wrapHtml(innerHtml: string, info: BusinessInfo): string {
  const contactParts = [info.address, info.phone, info.email].filter(Boolean)
  const contactLine = contactParts.join(' · ')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:${BRAND.background};font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.background};">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${BRAND.surface};border-radius:${BRAND.radius};overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          ${headerHtml(info.name, contactLine)}
          <tr><td style="padding:32px 40px;">${innerHtml}</td></tr>
          ${footerHtml()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function buildBusinessEmailHtml(businessId: string | null, innerHtml: string): Promise<string> {
  const info = await getBusinessInfo(businessId)
  return wrapHtml(innerHtml, info)
}

// ─── Template Builders ───────────────────────────────────────────

export function otpTemplate(code: string, label: string, customerName?: string): string {
  const greeting = customerName ? `<p style="color:${BRAND.text};font-size:15px;line-height:1.6;margin:0 0 16px;">Hi <strong>${customerName}</strong>,</p>` : ''
  return `
    ${greeting}
    <p style="color:${BRAND.text};font-size:15px;line-height:1.6;margin:0 0 4px;">Your verification code for <strong>${label}</strong> is:</p>
    <div style="background:${BRAND.primaryBg};border:2px dashed ${BRAND.primaryLight};padding:20px;border-radius:10px;text-align:center;margin:16px 0;">
      <p style="font-size:40px;letter-spacing:10px;font-weight:700;color:${BRAND.primary};margin:0;font-family:monospace;">${code}</p>
    </div>
    <p style="color:${BRAND.textMuted};font-size:13px;line-height:1.5;margin:0 0 4px;">⏰ This code expires in <strong>10 minutes</strong>.</p>
    <p style="color:${BRAND.textMuted};font-size:13px;line-height:1.5;margin:0;">If you didn't request this, you can safely ignore this email.</p>
  `
}

export function welcomeTemplate(firstName: string, lastName: string, points?: number): string {
  return `
    <div style="text-align:center;margin:0 0 24px;">
      <div style="width:64px;height:64px;border-radius:50%;background:${BRAND.primaryBg};display:inline-flex;align-items:center;justify-content:center;margin:0 auto 16px;">
        <span style="font-size:32px;">🎉</span>
      </div>
      <h2 style="color:${BRAND.text};font-family:'Segoe UI',Arial,sans-serif;font-size:22px;font-weight:700;margin:0 0 4px;">Welcome, ${firstName}!</h2>
      <p style="color:${BRAND.textMuted};font-size:14px;line-height:1.5;margin:0;">Your account has been created successfully.</p>
    </div>
    <div style="background:${BRAND.primaryBg};border-radius:10px;padding:20px;margin:0 0 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="text-align:center;padding:8px;">
            <p style="color:${BRAND.textMuted};font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Name</p>
            <p style="color:${BRAND.text};font-size:16px;font-weight:600;margin:0;">${firstName} ${lastName}</p>
          </td>
          <td style="text-align:center;padding:8px;border-left:1px solid ${BRAND.outline};">
            <p style="color:${BRAND.textMuted};font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Points Balance</p>
            <p style="color:${BRAND.primary};font-size:20px;font-weight:700;margin:0;">${points ?? 0}</p>
          </td>
        </tr>
      </table>
    </div>
    <div style="background:${BRAND.secondaryBg};border-radius:10px;padding:16px 20px;margin:0 0 20px;">
      <p style="color:${BRAND.secondary};font-size:14px;font-weight:600;margin:0 0 4px;">💡 What's next?</p>
      <p style="color:${BRAND.textMuted};font-size:13px;line-height:1.5;margin:0;">
        You can now earn <strong>1 point for every ₦100 spent</strong>. Redeem your points for discounts on future purchases.
      </p>
    </div>
    <p style="color:${BRAND.textMuted};font-size:13px;line-height:1.5;margin:0;">We look forward to serving you!</p>
  `
}

export function pointsEarnedTemplate(firstName: string, total: number, pointsEarned: number, totalPoints: number, reference: string): string {
  return `
    <p style="color:${BRAND.text};font-size:15px;line-height:1.6;margin:0 0 4px;">Thank you for your purchase, <strong>${firstName}</strong>!</p>
    <p style="color:${BRAND.textMuted};font-size:14px;line-height:1.5;margin:0 0 20px;">Transaction <code style="background:${BRAND.background};padding:2px 6px;border-radius:4px;font-size:12px;">${reference}</code></p>
    <div style="background:${BRAND.primaryBg};border-radius:10px;padding:24px;text-align:center;margin:0 0 20px;">
      <p style="color:${BRAND.textMuted};font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Amount Paid</p>
      <p style="font-size:28px;font-weight:700;color:${BRAND.text};margin:0 0 16px;">₦${total.toLocaleString()}</p>
      <div style="background:${BRAND.surface};border-radius:8px;padding:16px;margin:0 0 8px;">
        <p style="color:${BRAND.primary};font-size:32px;font-weight:700;margin:0;">+${pointsEarned}</p>
        <p style="color:${BRAND.textMuted};font-size:13px;margin:4px 0 0;">Points Earned</p>
      </div>
      <p style="color:${BRAND.textMuted};font-size:13px;margin:0;">New Balance: <strong style="color:${BRAND.primary};">${totalPoints.toLocaleString()} points</strong></p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
      <tr>
        <td style="background:${BRAND.background};border-radius:8px;padding:12px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="color:${BRAND.textMuted};font-size:13px;">Tier</td>
              <td style="text-align:right;font-size:13px;font-weight:600;color:${BRAND.text};">${totalPoints >= 1000 ? '🥇 PLATINUM' : totalPoints >= 500 ? '🥈 GOLD' : totalPoints >= 100 ? '🥉 SILVER' : '⚪ BRONZE'}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="color:${BRAND.textMuted};font-size:13px;line-height:1.5;margin:0;">Keep shopping to earn more points and unlock higher tiers for better rewards!</p>
  `
}

export function passwordChangedTemplate(firstName: string): string {
  return `
    <div style="text-align:center;margin:0 0 20px;">
      <div style="width:64px;height:64px;border-radius:50%;background:${BRAND.secondaryBg};display:inline-flex;align-items:center;justify-content:center;margin:0 auto 12px;">
        <span style="font-size:28px;">🔒</span>
      </div>
      <h2 style="color:${BRAND.text};font-family:'Segoe UI',Arial,sans-serif;font-size:20px;font-weight:700;margin:0 0 4px;">Password Changed</h2>
      <p style="color:${BRAND.textMuted};font-size:14px;line-height:1.5;margin:0;">Hi <strong>${firstName}</strong>, your password was successfully updated.</p>
    </div>
    <div style="background:${BRAND.dangerBg};border-radius:8px;padding:12px 16px;margin:0 0 16px;">
      <p style="color:${BRAND.danger};font-size:13px;line-height:1.5;margin:0;">⚠️ If you did not make this change, please contact support immediately.</p>
    </div>
    <p style="color:${BRAND.textMuted};font-size:13px;line-height:1.5;margin:0;">
      This change was made on <strong>${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>.
    </p>
  `
}

export function pinChangedTemplate(firstName: string): string {
  return `
    <div style="text-align:center;margin:0 0 20px;">
      <div style="width:64px;height:64px;border-radius:50%;background:${BRAND.secondaryBg};display:inline-flex;align-items:center;justify-content:center;margin:0 auto 12px;">
        <span style="font-size:28px;">🔑</span>
      </div>
      <h2 style="color:${BRAND.text};font-family:'Segoe UI',Arial,sans-serif;font-size:20px;font-weight:700;margin:0 0 4px;">PIN Changed</h2>
      <p style="color:${BRAND.textMuted};font-size:14px;line-height:1.5;margin:0;">Hi <strong>${firstName}</strong>, your POS PIN was successfully updated.</p>
    </div>
    <div style="background:${BRAND.dangerBg};border-radius:8px;padding:12px 16px;margin:0 0 16px;">
      <p style="color:${BRAND.danger};font-size:13px;line-height:1.5;margin:0;">⚠️ If you did not make this change, please contact support immediately.</p>
    </div>
    <p style="color:${BRAND.textMuted};font-size:13px;line-height:1.5;margin:0;">
      This change was made on <strong>${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>.
    </p>
  `
}

export function shiftNotificationTemplate(firstName: string, action: 'started' | 'ended', details: { startCash?: number; endCash?: number; cashDiff?: number; salesCount?: number }): string {
  const isStart = action === 'started'
  const icon = isStart ? '🚀' : '🏁'
  return `
    <div style="text-align:center;margin:0 0 20px;">
      <div style="width:64px;height:64px;border-radius:50%;background:${BRAND.primaryBg};display:inline-flex;align-items:center;justify-content:center;margin:0 auto 12px;">
        <span style="font-size:28px;">${icon}</span>
      </div>
      <h2 style="color:${BRAND.text};font-family:'Segoe UI',Arial,sans-serif;font-size:20px;font-weight:700;margin:0 0 4px;">Shift ${isStart ? 'Started' : 'Ended'}</h2>
      <p style="color:${BRAND.textMuted};font-size:14px;line-height:1.5;margin:0;">Hi <strong>${firstName}</strong>, your shift has been ${action}.</p>
    </div>
    <div style="background:${BRAND.background};border-radius:10px;padding:20px;margin:0 0 16px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${isStart ? `
        <tr>
          <td style="padding:6px 0;"><span style="color:${BRAND.textMuted};font-size:13px;">Starting Cash</span></td>
          <td style="text-align:right;font-size:14px;font-weight:600;color:${BRAND.primary};">₦${(details.startCash ?? 0).toLocaleString()}</td>
        </tr>` : `
        <tr>
          <td style="padding:6px 0;"><span style="color:${BRAND.textMuted};font-size:13px;">Starting Cash</span></td>
          <td style="text-align:right;font-size:14px;font-weight:600;color:${BRAND.text};">₦${(details.startCash ?? 0).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;border-top:1px solid ${BRAND.outline};"><span style="color:${BRAND.textMuted};font-size:13px;">Ending Cash</span></td>
          <td style="text-align:right;padding:6px 0;border-top:1px solid ${BRAND.outline};font-size:14px;font-weight:600;color:${BRAND.text};">₦${(details.endCash ?? 0).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;border-top:1px solid ${BRAND.outline};"><span style="color:${BRAND.textMuted};font-size:13px;">Cash Difference</span></td>
          <td style="text-align:right;padding:6px 0;border-top:1px solid ${BRAND.outline};font-size:14px;font-weight:600;color:${(details.cashDiff ?? 0) >= 0 ? BRAND.primary : BRAND.danger};">${(details.cashDiff ?? 0) >= 0 ? '+' : ''}₦${(details.cashDiff ?? 0).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;border-top:1px solid ${BRAND.outline};"><span style="color:${BRAND.textMuted};font-size:13px;">Sales This Shift</span></td>
          <td style="text-align:right;padding:6px 0;border-top:1px solid ${BRAND.outline};font-size:14px;font-weight:600;color:${BRAND.text};">${details.salesCount ?? 0} transaction(s)</td>
        </tr>`}
      </table>
    </div>
    <p style="color:${BRAND.textMuted};font-size:13px;margin:0;">${new Date().toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
  `
}

export function genericNotificationTemplate(title: string, message: string, details?: Record<string, string>): string {
  const detailRows = details ? Object.entries(details).map(([k, v]) => `
    <tr>
      <td style="padding:4px 0;color:${BRAND.textMuted};font-size:13px;">${k}</td>
      <td style="text-align:right;padding:4px 0;font-size:13px;font-weight:600;color:${BRAND.text};">${v}</td>
    </tr>`).join('') : ''
  return `
    <h2 style="color:${BRAND.text};font-family:'Segoe UI',Arial,sans-serif;font-size:20px;font-weight:700;margin:0 0 12px;">${title}</h2>
    <p style="color:${BRAND.text};font-size:15px;line-height:1.6;margin:0 0 16px;">${message}</p>
    ${details ? `<table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.background};border-radius:8px;padding:12px 16px;margin:0 0 16px;">${detailRows}</table>` : ''}
  `
}

// ─── Send Helper ─────────────────────────────────────────────────

export async function sendBusinessEmail(options: {
  to: string
  subject: string
  text: string
  html: string
  businessId?: string | null
}) {
  const { sendEmail } = await import('./email.job.js')
  const fullHtml = await buildBusinessEmailHtml(options.businessId ?? null, options.html)
  const txt = `${options.text}\n\n---\nZudo POS`
  await sendEmail({ to: options.to, subject: options.subject, text: txt, html: fullHtml })
}