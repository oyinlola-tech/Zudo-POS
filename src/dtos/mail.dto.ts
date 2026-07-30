export type MailData = {
  to: string
  subject: string
  text: string
  html?: string
  sentAt?: string
}

export type MailStatusData = {
  messageId: string
  status: 'sent' | 'delivered' | 'failed'
  error?: string
}
