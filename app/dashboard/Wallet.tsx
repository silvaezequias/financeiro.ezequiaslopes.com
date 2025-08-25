import DashboardCard from "@/components/dashboard/dashboard-card";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { financialData } from "./financialData";
import { Button } from "@/components/ui/button";

export default function Wallet() {
  return (
    <DashboardCard title="CARTEIRA" icon={DollarSign}>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 mb-1">Saldo</h2>
          <div className="text-2xl font-bold text-amber-300">
            R${" "}
            {financialData.balance.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
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

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 mt-3"
        >
          Extrato
        </Button>
      </div>
    </DashboardCard>
  );
}
