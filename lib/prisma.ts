let PrismaClient: any
let prismaInstance: any = null

try {
  const prismaModule = require('@prisma/client')
  PrismaClient = prismaModule.PrismaClient
} catch (error) {
  console.warn('[v0] Prisma client not generated. Run `pnpm db:generate` to use database features.')
  PrismaClient = null
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

if (PrismaClient) {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
}

export const prisma = prismaInstance
export const isPrismaAvailable = !!prismaInstance
