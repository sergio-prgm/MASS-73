// src/server/db/client.ts
import { PrismaClient } from '@prisma/client'
import { env } from '../../env/server.mjs'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  global.prisma ||
  new PrismaClient({
    log: ['query']
  })

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
