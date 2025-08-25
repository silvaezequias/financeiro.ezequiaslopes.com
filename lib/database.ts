import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("NEXT_PUBLIC_DATABASE_URL:", process.env.NEXT_PUBLIC_DATABASE_URL);

declare global {
  var database: PrismaClient | undefined;
}

export const database =
  global.database ||
  new PrismaClient({
    log: ["error"], // opcional, para debug
  });

if (process.env.NODE_ENV !== "production") global.database = database;
