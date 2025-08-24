import { jetmono } from "@/lib/fonts";
import { Wallet2, ArrowDownRight, ArrowUpLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function ShortWallet() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-900 bg-neutral-950">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-300">
          <Wallet2 className="h-5 w-5" />
          <span
            className={`${jetmono.className} text-xs uppercase tracking-widest`}
          >
            Carteira
          </span>
        </div>
        <div className="space-y-3">
          <div className="border-t border-neutral-800 pt-3">
            <div className="flex justify-between items-center mb-5">
              <span className="text-neutral-200 font-medium text-3xl">
                Saldo
              </span>
              <span className="text-amber-300 font-bold text-xl">R$ 2.060</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Receitas</span>
            <span className="text-green-300 font-semibold flex items-center gap-2">
              R$ 5.240
              <ArrowUpLeft className="h-4 w-4" />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Gastos</span>
            <span className="text-red-300 font-semibold flex items-center gap-2">
              R$ 3.00
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </div>
          <Button
            variant={"ghost"}
            className="flex w-70 hover:bg-amber-300 hover:text-neutral-900 bg-neutral-900/60 rounded-lg text-sm text-neutral-300"
          >
            Extrato
          </Button>
        </div>
      </div>
    </div>
  );
}
