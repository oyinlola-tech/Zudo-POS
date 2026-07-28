export class FirebaseClient {
  private fcmUrl: string
  private serverKey: string

  constructor() {
    this.fcmUrl = process.env['FCM_API_URL'] ?? 'https://fcm.googleapis.com/fcm/send'
    this.serverKey = process.env['FIREBASE_SERVER_KEY'] ?? ''
  }

  async sendNotification(data: {
    token: string
    title: string
    body: string
    data?: Record<string, string>
  }) {
    if (!this.serverKey) {
      console.log('[FCM] Skipped — no FIREBASE_SERVER_KEY configured')
      return
    }

    const res = await fetch(this.fcmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${this.serverKey}`,
      },
      body: JSON.stringify({
        to: data.token,
        notification: { title: data.title, body: data.body },
        data: data.data,
      }),
    })
    if (!res.ok) throw new Error(`FCM failed: ${res.status}`)
  }
}

export const firebaseClient = new FirebaseClient()