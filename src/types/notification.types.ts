export type NotificationItem = {
  id: string; title: string; message: string; type?: string
  read: boolean; createdAt: Date
}

export type NotificationListOutput = {
  items: NotificationItem[]; total: number; page: number; limit: number
}

export type UnreadCountOutput = { unread: number }

export type BroadcastInput = {
  title: string; message: string; type?: string
}

export type BroadcastOutput = {
  notifications: NotificationItem[]; sentTo: number
}