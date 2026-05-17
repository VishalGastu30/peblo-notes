import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Note: For serverless deployments (Vercel), connection pooling is handled
// via Prisma Accelerate or PgBouncer at the database level (Supabase).
// Max connections should be limited to ~10 for serverless environments.
// Set in DATABASE_URL: ?pgbouncer=true&connection_limit=10
