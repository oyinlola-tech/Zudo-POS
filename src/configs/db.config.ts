export function buildDatabaseUrl(): string {
  const provider = process.env['DB_PROVIDER'] || 'sqlite'
  if (provider === 'sqlite') {
    const name = process.env['DB_NAME'] || 'dev'
    return `file:./${name}.db`
  }
  const host = process.env['DB_HOST'] || 'localhost'
  const port = process.env['DB_PORT'] || '3306'
  const user = process.env['DB_USER'] || 'root'
  const password = process.env['DB_PASSWORD'] || ''
  const database = process.env['DB_NAME'] || 'zudo_pos'
  return `${provider}://${user}:${password}@${host}:${port}/${database}`
}
