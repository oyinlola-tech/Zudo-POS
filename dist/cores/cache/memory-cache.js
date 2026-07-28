export class MemoryCache {
    store = new Map();
    set(key, value, ttlMs = 300000) {
        this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
    }
    get(key) {
        const entry = this.store.get(key);
        if (!entry)
            return undefined;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return undefined;
        }
        return entry.value;
    }
    delete(key) { this.store.delete(key); }
    clear() { this.store.clear(); }
}
export const cache = new MemoryCache();
//# sourceMappingURL=memory-cache.js.map