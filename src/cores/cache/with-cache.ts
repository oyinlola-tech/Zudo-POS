import { cache } from './index.js'

export function withCache<TInput, TOutput>(
  fn: (input: TInput) => Promise<TOutput>,
  keyFn: (input: TInput) => string,
  ttlMs = 300_000,
): (input: TInput) => Promise<TOutput> {
  return async (input: TInput) => {
    const key = keyFn(input)
    const cached = cache.get<TOutput>(key)
    if (cached !== undefined) return cached
    const result = await fn(input)
    cache.set(key, result, ttlMs)
    return result
  }
}
