import DashboardCard from "@/components/dashboard/dashboard-card";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { financialData } from "./financialData";
import { WalletSummary } from "@prisma/client";
import formatter from "@/formatter";
import { UserWallets } from "@/hooks/useUserWallets";

type WalletProps = {
  className?: string;
  userWallets: UserWallets;
  summary: WalletSummary;
};

export default function WalletComponent({
  className,
  userWallets,
  summary,
}: WalletProps) {
  const { loading, currentWallet: wallet } = userWallets;

  if (loading || !wallet) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-300 mx-auto mb-4"></div>
          <p className="text-neutral-400">Carregando carteira...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardCard title="CARTEIRA" icon={DollarSign} className={className}>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 mb-1">Saldo</h2>
          <div className="text-2xl font-bold text-amber-300">
            {formatter.number.currency(wallet.balance, wallet.currency)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-neutral-300 text-sm">Receitas</span>
            <div className="flex items-center gap-1">
              <span className="text-green-400 font-medium text-sm">
                R${" "}
                {financialData.monthlyIncome.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <ArrowUpRight className="h-3 w-3 text-green-400" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-300 text-sm">Gastos</span>
            <div className="flex items-center gap-1">
              <span className="text-red-400 font-medium text-sm">
                R${" "}
                {financialData.monthlyExpenses.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <ArrowDownRight className="h-3 w-3 text-red-400" />
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
