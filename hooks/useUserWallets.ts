import { useCallback, useEffect, useState } from "react";
import { Wallet } from "@prisma/client";
import smartFetch from "@/lib/smartFetch";
import localDatabase from "@/lib/localDatabase";
import { toast } from "sonner";
import formatter from "@/formatter";

export function useUserWallets(): UserWallets {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWallets = useCallback(async () => {
    try {
      const cachedCurrent = localDatabase.get("currentWallet") as Wallet;
      setLoading(true);

      let response = (await smartFetch("/api/wallets")) as Wallet[];
      response = response.map((w) => {
        w.name = formatter.text.capitalize(w.name);
        return w;
      });

      setWallets(response);
      localDatabase.set("wallets", response);

      if (!cachedCurrent || !response.find((w) => w.id === cachedCurrent.id)) {
        const newCurrent = response[0] || null;
        setCurrentWallet(newCurrent);
        if (newCurrent) localDatabase.set("currentWallet", newCurrent);
      }
    } catch (err) {
      toast.error("Erro ao carregar as wallets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cachedWallets = (localDatabase.get("wallets") || []) as Wallet[];
    const cachedCurrent = localDatabase.get("currentWallet") as Wallet;

    if (cachedWallets.length) {
      setWallets(cachedWallets);

      if (
        cachedCurrent &&
        cachedWallets.find((w) => w.id === cachedCurrent.id)
      ) {
        setCurrentWallet(cachedCurrent);
      } else {
        setCurrentWallet(cachedWallets[0]);
        localDatabase.set("currentWallet", cachedWallets[0]);
      }
    }

    fetchWallets();
  }, []);

  const handleSetCurrentWallet = (walletId: Wallet["id"]) => {
    const selected = wallets.find((w) => w.id === walletId);

    if (selected) {
      setCurrentWallet(selected);
      localDatabase.set("currentWallet", selected);
    } else toast.error("Não foi possível encontrar a carteira selecionada.");
  };

  return {
    wallets,
    currentWallet: currentWallet as Wallet,
    setCurrentWallet: handleSetCurrentWallet,
    loading,
    refreshWallets: fetchWallets,
  };
}

export type UserWallets = {
  wallets: Wallet[];
  currentWallet: Wallet;
  setCurrentWallet: (walletId: Wallet["id"]) => void;
  loading: boolean;
  refreshWallets: () => Promise<void>;
};
