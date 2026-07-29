import type { FastifyRequest, FastifyReply } from 'fastify'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadDir = path.join(__dirname, '../../public/uploads')

export async function uploadHandler(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user) return reply.status(401).send({ error: 'Unauthorized' })
  const file = await request.file()
  if (!file) return reply.status(400).send({ error: 'No file uploaded' })

  await fs.mkdir(uploadDir, { recursive: true })
  const ext = path.extname(file.filename) || '.bin'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const filepath = path.join(uploadDir, filename)

  const chunks: Buffer[] = []
  for await (const chunk of file.file) {
    chunks.push(chunk)
  }
  await fs.writeFile(filepath, Buffer.concat(chunks))

  return reply.send({ url: `/uploads/${filename}`, filename: file.filename })
}
