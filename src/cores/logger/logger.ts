export function createLogger(name: string) {
  return {
    info: (message: string, data?: unknown) => console.log(`[${name}] ${message}`, data ?? ''),
    warn: (message: string, data?: unknown) => console.warn(`[${name}] ${message}`, data ?? ''),
    error: (message: string, data?: unknown) => console.error(`[${name}] ${message}`, data ?? ''),
  }
}

export const logger = createLogger('Zudo')