"use client";

import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { mockTransactions, getBalanceForPeriod } from "./transactions";

interface Transaction {
  date: Date;
  amount: number;
  description: string;
}

interface PeriodDetailsProps {
  period: { type: "day" | "month" | "year"; date: Date } | null;
  className?: string;
}

export default function PeriodDetails({
  period,
  className = "",
}: PeriodDetailsProps) {
  if (!period) {
    return (
      <div
        className={`bg-neutral-950/40 border border-neutral-900 rounded-lg p-4 w-full ${className}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-amber-300" />
          <span className="font-mono text-sm font-medium text-amber-300 uppercase tracking-wider">
            DETALHES DO PERÍODO
          </span>
        </div>
        <div className="text-center text-neutral-400 py-8">
          Selecione um dia, mês ou ano no timeline para ver os detalhes
        </div>
      </div>
    );
  }

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const transactionDate = transaction.date;
    if (period.type === "day") {
      return transactionDate.toDateString() === period.date.toDateString();
    } else if (period.type === "month") {
      return (
        transactionDate.getMonth() === period.date.getMonth() &&
        transactionDate.getFullYear() === period.date.getFullYear()
      );
    } else {
      return transactionDate.getFullYear() === period.date.getFullYear();
    }
  });

  const { balance } = getBalanceForPeriod(period.date, period.type);
  const income = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const formatPeriod = () => {
    if (period.type === "day") {
      return period.date.toLocaleDateString("pt-BR");
    } else if (period.type === "month") {
      return period.date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
    } else {
      return period.date.getFullYear().toString();
    }
  };

  return (
    <div
      className={`bg-neutral-950/40 border border-neutral-900 rounded-lg p-4 w-full ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-amber-300" />
        <span className="font-mono text-sm font-medium text-amber-300 uppercase tracking-wider">
          DETALHES DO PERÍODO
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {formatPeriod()}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xs text-neutral-400 mb-1">Receitas</div>
              <div className="text-green-400 lg:text-sm font-semibold">
                R${" "}
                {income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-400 mb-1">Gastos</div>
              <div className="text-red-400 lg:text-sm font-semibold">
                R${" "}
                {expenses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-400 mb-1">Saldo</div>
              <div
                className={`font-semibold ${
                  balance >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                R${" "}
                {balance.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>

        {filteredTransactions.length > 0 ? (
          <div>
            <h4 className="text-sm font-medium text-neutral-300 mb-3">
              Transações
            </h4>
            <div className="space-y-2">
              {filteredTransactions
                .sort((a, b) => {
                  return b.date.getTime() - a.date.getTime();
                })
                .map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-neutral-900/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {transaction.amount > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <div>
                        <div className="text-sm text-white">
                          {transaction.description}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {transaction.date.toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        transaction.amount > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}R${" "}
                      {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-neutral-400 py-4">
            Nenhuma transação encontrada para este período
          </div>
        )}
      </div>
    </div>
  );
}
