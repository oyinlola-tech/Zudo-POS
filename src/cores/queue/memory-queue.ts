type JobHandler<T> = (payload: T) => Promise<void>

interface Job<T> {
  id: string
  name: string
  payload: T
  createdAt: Date
}

export class MemoryQueue {
  private handlers = new Map<string, JobHandler<unknown>>()
  private pending = new Map<string, Job<unknown>>()

  register<T>(name: string, handler: JobHandler<T>): void {
    this.handlers.set(name, handler as JobHandler<unknown>)
  }

  enqueue<T>(name: string, payload: T): void {
    const job: Job<T> = { id: crypto.randomUUID(), name, payload, createdAt: new Date() }
    this.pending.set(job.id, job)
    this.process()
  }

  private async process(): Promise<void> {
    for (const [id, job] of this.pending) {
      const handler = this.handlers.get(job.name)
      if (!handler) continue
      this.pending.delete(id)
      try { await handler(job.payload) } catch { /* queue errors logged by handlers */ }
    }
  }
}

export const queue = new MemoryQueue()