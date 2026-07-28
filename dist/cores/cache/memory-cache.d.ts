export declare class MemoryCache {
    private store;
    set<T>(key: string, value: T, ttlMs?: number): void;
    get<T>(key: string): T | undefined;
    delete(key: string): void;
    clear(): void;
}
export declare const cache: MemoryCache;
//# sourceMappingURL=memory-cache.d.ts.map