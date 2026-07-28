import { getDb } from '../databases/index.js'

export async function buildBusinessEmailHtml(businessId: string | null, innerHtml: string): Promise<string> {
  let name = 'Zudo POS'
  let address = ''
  let phone = ''
  let email = ''

  if (businessId) {
    try {
      const biz = await getDb().business.findUnique({ where: { id: businessId } })
      if (biz) {
        name = biz.name
        address = biz.address ?? ''
        phone = biz.phone ?? ''
        email = biz.email ?? ''
      }
    } catch {
      // fallback to generic
    }
  }

  const contactParts = [address, phone, email].filter(Boolean)
  const contactLine = contactParts.length > 0 ? contactParts.join(' · ') : ''

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
      <div style="background: linear-gradient(135deg, #1b6d24 0%, #2d9e3a 100%); padding: 24px 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">${name}</h1>
        ${contactLine ? `<p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 13px;">${contactLine}</p>` : ''}
      </div>
      <div style="padding: 32px;">
        ${innerHtml}
      </div>
      <div style="background: #f8f9ff; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">Powered by <strong style="color: #1b6d24;">Zudo POS</strong></p>
      </div>
    </div>
  `
}

export async function sendBusinessEmail(options: {
  to: string
  subject: string
  text: string
  html: string
  businessId?: string | null
}) {
  const { sendEmail } = await import('./email.job.js')
  const fullHtml = await buildBusinessEmailHtml(options.businessId ?? null, options.html)
  await sendEmail({ to: options.to, subject: options.subject, text: options.text, html: fullHtml })
}