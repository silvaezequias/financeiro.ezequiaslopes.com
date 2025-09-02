import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
  ChevronDown,
  Plus,
  Wallet as WalletIcon,
  Loader,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Wallet, WalletMember } from "@prisma/client";
import smartFetch from "@/lib/smartFetch";
import { GetPayloadResult } from "@prisma/client/runtime/library";
import Link from "next/link";
import localDatabase from "@/lib/localDatabase";

const mockWallets = [
  {
    id: 1,
    name: "Carteira Principal",
    balance: 2500.5,
    color: "text-green-400",
  },
  { id: 2, name: "Poupança", balance: 15000.0, color: "text-blue-400" },
  { id: 3, name: "Investimentos", balance: 8750.25, color: "text-purple-400" },
  { id: 4, name: "Emergência", balance: 5000.0, color: "text-orange-400" },
];

export function WalletDropdownSelect() {
  const [wallets, setWallets] = useState<Partial<Wallet>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>();

  async function getWallets() {
    const updatedWallets: { member: WalletMember & { wallet: Wallet } }[] =
      await smartFetch("/api/wallets/");

    const firstWallet = updatedWallets[0].member.wallet;
    const localCurrentWallet: Wallet = localDatabase.get("currentWallet");

    let currentWallet = firstWallet;

    if (localCurrentWallet) {
      const current = updatedWallets.find(
        (wallet) => wallet.member.wallet.id === localCurrentWallet.id
      );

      if (current) {
        currentWallet = current.member.wallet;
      }
    } else {
      localDatabase.set("currentWallet", firstWallet);
    }

    setCurrentWallet(currentWallet);
    setWallets(updatedWallets.map((wM) => wM.member.wallet));
  }

  useEffect(() => {
    getWallets();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  function capitalizeText(text: string) {
    if (!text) return "";

    let capitalizedText: string[] = [];
    const splittedText = text.split(" ");

    splittedText.forEach((token) => {
      capitalizedText.push(token.charAt(0).toUpperCase() + token.slice(1));
    });

    return capitalizedText.join(" ");
  }

  function onChangeWallet(walletId: string) {
    const wallet = wallets.find((wallet) => wallet.id === walletId);

    if (wallet) {
      setCurrentWallet(wallet as Wallet);

      localDatabase.set("currentWallet", wallet);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 px-3 py-2 h-auto text-neutral-200 hover:text-amber-300 hover:bg-neutral-800/50"
        >
          {currentWallet ? (
            <>
              <WalletIcon
                className={`h-4 w-4`}
                style={{
                  color: currentWallet.color || "#aaa",
                }}
              />
              <span className="text-sm font-medium">
                {capitalizeText(currentWallet.name)}
              </span>
              <span className="text-xs text-neutral-400">
                {formatCurrency(0)}
              </span>
              <ChevronDown className="h-3 w-3" />
            </>
          ) : (
            <span>Carregando carteiras...</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 bg-neutral-900 border-neutral-700 rounded-2xl border"
        align="center"
      >
        <div className="p-2">
          {isLoading && (
            <div className="flex justify-center mt-5">
              <Loader2 className="animate-spin w-7 h-7" />
            </div>
          )}

          {!isLoading &&
            (!!wallets.length ? (
              wallets.map((wallet) => (
                <DropdownMenuItem
                  onSelect={() => onChangeWallet(wallet.id!)}
                  key={wallet.id}
                  className="flex items-center justify-between p-3 overflow-hidden  w-full text-neutral-200 hover:bg-neutral-800 cursor-pointer rounded-md"
                >
                  <div className="flex items-center gap-3 w-full ">
                    <WalletIcon
                      className={`h-4 w-4`}
                      style={{ color: wallet.color || "#aaa" }}
                    />
                    <span className="font-medium text-sm overflow-hidden text-nowrap text-ellipsis w-[50%]">
                      {capitalizeText(wallet.name!)}
                    </span>
                    <span className="text-sm text-neutral-400">
                      {formatCurrency(0)}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="text-sm text-center mt-2 text-neutral-400">
                Não há carteiras...
              </div>
            ))}
        </div>
        <div className="flex justify-center m-2">
          <Link href="/carteiras/criar" className="w-full">
            <Button
              variant="default"
              className="bg-transparent hover:bg-neutral-800 cursor-pointer hover:text-neutral-100 w-full"
            >
              <Plus className="w-1.5 h-1.5" />
              Criar Carteira
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
