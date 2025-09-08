import { GetWalletSummary } from "@/types/wallet";
import { WalletSummary } from "@prisma/client";
import { useEffect, useState } from "react";

export function useWalletSummary(walletId: string, from?: Date, to?: Date) {
  const [currentSummary, setCurrentSummary] = useState<WalletSummary | null>(
    null
  );
  const [loading, setLoading] = useState(false);
}
