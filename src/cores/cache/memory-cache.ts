interface CacheEntry<T> {
  value: T
  expiresAt: number
}

export class MemoryCache {
  private store = new Map<string, CacheEntry<unknown>>()

  set<T>(key: string, value: T, ttlMs: number = 300000): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs })
  }

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return undefined
    }
    return entry.value as T
  }

  delete(key: string): void { this.store.delete(key) }
  clear(): void { this.store.clear() }
}

export const cache = new MemoryCache()