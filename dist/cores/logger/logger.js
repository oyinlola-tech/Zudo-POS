export function createLogger(name) {
    return {
        info: (message, data) => console.log(`[${name}] ${message}`, data ?? ''),
        warn: (message, data) => console.warn(`[${name}] ${message}`, data ?? ''),
        error: (message, data) => console.error(`[${name}] ${message}`, data ?? ''),
    };
}
export const logger = createLogger('Zudo');
//# sourceMappingURL=logger.js.map