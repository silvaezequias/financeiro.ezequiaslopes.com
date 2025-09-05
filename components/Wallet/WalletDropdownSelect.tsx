import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Plus, Wallet as WalletIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUserWallets } from "@/hooks/useUserWallets";
import formatter from "@/formatter";

export function WalletDropdownSelect() {
  const { loading, currentWallet, setCurrentWallet, wallets } =
    useUserWallets();

  function capitalizeText(text: string) {
    if (!text) return "";

    let capitalizedText: string[] = [];
    const splittedText = text.split(" ");

    splittedText.forEach((token) => {
      capitalizedText.push(token.charAt(0).toUpperCase() + token.slice(1));
    });

    return capitalizedText.join(" ");
  }

  function handleWalletSelection(walletId: string) {
    setCurrentWallet(walletId);
    location.href = "/carteiras/" + walletId;
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
                {formatter.number.currency(
                  currentWallet.balance,
                  currentWallet.currency
                )}
              </span>
              <ChevronDown className="h-3 w-3" />
            </>
          ) : (
            <span>Carregando carteiras...</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-neutral-900 border-neutral-700 rounded-2xl border"
        align="center"
      >
        <div className="p-2">
          {loading && (
            <div className="flex justify-center mt-5">
              <Loader2 className="animate-spin w-7 h-7" />
            </div>
          )}

          {!loading &&
            (!!wallets.length ? (
              wallets.map((wallet) => (
                <DropdownMenuItem
                  onSelect={() => handleWalletSelection(wallet.id!)}
                  key={wallet.id}
                  className="flex items-center justify-between p-3 overflow-hidden  w-full text-neutral-200 hover:bg-neutral-800 cursor-pointer rounded-md"
                >
                  <div className="flex items-center gap-3 w-full justify-between ">
                    <span className="flex items-center gap-3 w-[60%]">
                      <WalletIcon
                        className={`h-5 w-5`}
                        style={{ color: wallet.color || "#aaa" }}
                      />
                      <span className="font-medium text-sm overflow-hidden text-nowrap text-ellipsis w-full">
                        {capitalizeText(wallet.name!)}
                      </span>
                    </span>
                    <span className="text-sm text-neutral-400 ">
                      {formatter.number.currency(
                        wallet.balance,
                        wallet.currency
                      )}
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
