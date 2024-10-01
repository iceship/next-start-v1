import { PrismaClient } from "@prisma/client";

import { env } from "@/env/server";

// const createPrismaClient = () =>
//   new PrismaClient({
//     log:
//       env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });

//const globalForPrisma = globalThis as unknown as {
//  prisma: ReturnType<typeof createPrismaClient> | undefined;
//};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

//export const db = globalForPrisma.prisma ?? createPrismaClient();
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
