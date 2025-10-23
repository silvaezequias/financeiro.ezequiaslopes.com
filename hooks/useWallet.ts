import { useEffect, useState } from "react";
import { Wallet } from "@prisma/client";
import smartFetch from "@/lib/smartFetch";
import localDatabase from "@/lib/localDatabase";
import { useUserWallets } from "./useUserWallets";

export function useWallet() {
  const { wallets, loading: walletsLoading } = useUserWallets();
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletsLoading) return;

    if (wallets.length === 0) {
      setLoading(false);
      return;
    }

    const fetchWallet = async () => {
      setLoading(true);
      const storedWallet = localDatabase.get("currentWallet");
      let walletData: Wallet | null = null;

      if (storedWallet) {
        const response = (await smartFetch(
          `/api/wallets/${storedWallet.id}`
        )) as Wallet;
        walletData = response;
      }

      if (!walletData) {
        walletData = wallets[0];
        localDatabase.set("currentWallet", walletData);
      }

      setCurrentWallet(walletData);
      setLoading(false);
    };

    fetchWallet();
  }, [wallets, walletsLoading]);

  const onSelectWallet = (wallet: Wallet) => {
    setCurrentWallet(wallet);
    localDatabase.set("currentWallet", wallet);
  };

  return {
    currentWallet,
    onSelectWallet,
    loading,
  };
}
