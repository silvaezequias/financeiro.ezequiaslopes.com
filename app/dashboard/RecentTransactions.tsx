import DashboardCard from "@/components/dashboard/dashboard-card";
import { ArrowDownRight, ArrowUpRight, Receipt } from "lucide-react";
import Link from "next/link";
import { recentTransactions } from "./financialData";
import { Button } from "@/components/ui/button";

export default function RecentTransactions() {
  return (
    <DashboardCard title="TRANSAÇÕES RECENTES" icon={Receipt}>
      <div className="space-y-3">
        {recentTransactions.slice(0, 3).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-1"
          >
            <div className="flex-1">
              <p className="text-neutral-200 font-medium text-xs">
                {transaction.description}
              </p>
              <p className="text-xs text-neutral-500">
                {new Date(transaction.date).toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`font-medium text-xs ${
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                R$ {transaction.type === "income" ? "" : "-"}
                {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
              {transaction.type === "income" ? (
                <ArrowUpRight className="h-3 w-3 text-green-400" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-400" />
              )}
            </div>
          </div>
        ))}

        <Link href="/transactions">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 mt-3"
          >
            Ver transações
          </Button>
        </Link>
      </div>
    </DashboardCard>
  );
}
