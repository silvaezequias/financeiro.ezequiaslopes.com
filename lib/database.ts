import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

declare global {
  var database: PrismaClient | undefined;
}

export const database =
  global.database ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") global.database = database;
