import { useEffect, useState } from "react";
import { Wallet } from "@prisma/client";
import smartFetch from "@/lib/smartFetch";
import localDatabase from "@/lib/localDatabase";
import { toast } from "sonner";
import formatter from "@/formatter";

export function useUserWallets(): UserWallets {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        setLoading(true);
        let response = (await smartFetch("/api/wallets")) as Wallet[];

        response = response.map((w) => {
          w.name = formatter.text.capitalize(w.name);
          return w;
        });

        setWallets(response);

        const storedWallet = localDatabase.get("currentWallet") as Wallet;
        let selected = null;

        if (storedWallet) {
          selected = response.find((w) => w.id === storedWallet.id);
        }

        if (!selected && response.length) {
          selected = response[0];
          localDatabase.set("currentWallet", selected);
        }

        setCurrentWallet(selected || null);
      } finally {
        setLoading(false);
      }
    };

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
  };
}

export type UserWallets = {
  wallets: Wallet[];
  currentWallet: Wallet;
  setCurrentWallet: (walletId: Wallet["id"]) => void;
  loading: boolean;
};
