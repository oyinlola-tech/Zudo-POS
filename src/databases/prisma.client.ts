import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { buildDatabaseUrl } from '../configs/db.config.js'

let prisma: PrismaClient

export function getDb(): PrismaClient {
  if (!prisma) {
    const url = buildDatabaseUrl()
    const adapter = new PrismaLibSql({ url })
    prisma = new PrismaClient({ adapter })
  }
  return prisma
}

export async function disconnectDb(): Promise<void> {
  if (prisma) await prisma.$disconnect()
}