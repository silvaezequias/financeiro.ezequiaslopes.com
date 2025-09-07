import { Wallet } from "@prisma/client";

export type GetWallets = Omit<Wallet, "deleted" | "createdById"> & {
  stats: {
    creditCards: number;
    members: number;
    transactions: number;
  };
};
