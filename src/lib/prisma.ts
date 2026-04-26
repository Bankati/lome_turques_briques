import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

// Éviter l'instanciation immédiate au build — lazy evaluation
const handler: ProxyHandler<PrismaClient> = {
  get(_, prop) {
    const client = getPrismaClient();
    return (client as any)[prop];
  },
};

export const prisma = new Proxy({} as PrismaClient, handler);

// PrismaClient est injecté dans hot-reload pour éviter les instances multiples
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = getPrismaClient();
}
