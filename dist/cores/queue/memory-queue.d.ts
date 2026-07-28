type JobHandler<T> = (payload: T) => Promise<void>;
export declare class MemoryQueue {
    private handlers;
    private pending;
    register<T>(name: string, handler: JobHandler<T>): void;
    enqueue<T>(name: string, payload: T): void;
    private process;
}
export declare const queue: MemoryQueue;
export {};
//# sourceMappingURL=memory-queue.d.ts.map