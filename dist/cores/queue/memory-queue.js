export class MemoryQueue {
    handlers = new Map();
    pending = new Map();
    register(name, handler) {
        this.handlers.set(name, handler);
    }
    enqueue(name, payload) {
        const job = { id: crypto.randomUUID(), name, payload, createdAt: new Date() };
        this.pending.set(job.id, job);
        this.process();
    }
    async process() {
        for (const [id, job] of this.pending) {
            const handler = this.handlers.get(job.name);
            if (!handler)
                continue;
            this.pending.delete(id);
            try {
                await handler(job.payload);
            }
            catch { /* queue errors logged by handlers */ }
        }
    }
}
export const queue = new MemoryQueue();
//# sourceMappingURL=memory-queue.js.map