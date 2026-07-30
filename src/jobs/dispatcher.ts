import { queue, logger } from '../cores/index.js'
import { sendBusinessEmail } from './email-template.util.js'
import { firebaseClient } from '../apis/index.js'

type EmailPayload = {
  to: string
  subject: string
  text: string
  html?: string
  businessId?: string | null
}

type FirebasePayload = {
  token: string
  title: string
  body: string
  data?: Record<string, string>
}

export function registerJobHandlers() {
  queue.register<EmailPayload>('send-email', async (payload) => {
    try {
      await sendBusinessEmail({
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: payload.html ?? '',
        businessId: payload.businessId,
      })
    } catch (err) {
      logger.error('Email job failed', err)
    }
  })

  queue.register<FirebasePayload>('send-push', async (payload) => {
    try {
      await firebaseClient.sendNotification({
        token: payload.token,
        title: payload.title,
        body: payload.body,
        data: payload.data,
      })
    } catch (err) {
      logger.error('Push notification job failed', err)
    }
  })

  logger.info('Job handlers registered')
}
