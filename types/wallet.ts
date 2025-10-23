import { Wallet, WalletSummary } from "@prisma/client";

export type GetWallets = Omit<Wallet, "deleted" | "createdById"> & {
  stats: {
    creditCards: number;
    members: number;
    transactions: number;
  };
};

export type GetWalletSummary = Omit<
  WalletSummary,
  "id" | "createdAt" | "walletId"
>;
