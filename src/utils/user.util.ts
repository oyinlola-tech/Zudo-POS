export function sanitizeUser<T extends Record<string, unknown>>(user: T): Omit<T, 'passwordHash' | 'pinHash'> {
  const { passwordHash, pinHash, ...safe } = user as T & { passwordHash?: string; pinHash?: string }
  return safe as Omit<T, 'passwordHash' | 'pinHash'>
}