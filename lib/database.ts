import { PrismaClient } from "@prisma/client";

declare global {
  var database: PrismaClient | undefined;
}

export const database =
  global.database ||
  new PrismaClient({
    log: ["error"], // opcional, para debug
  });

if (process.env.NODE_ENV !== "production") global.database = database;
