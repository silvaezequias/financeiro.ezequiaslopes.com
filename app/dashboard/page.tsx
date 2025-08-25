"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  DollarSign,
  CreditCardIcon,
  Receipt,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  PieChart,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Pie as RechartsPie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import DashboardCard from "@/components/dashboard/dashboard-card";
import CreditCardComponent from "@/components/dashboard/credit-card";
import PeriodDetails from "@/components/dashboard/period-details";
import Layout from "@/components/Layout";
import Timeline from "@/components/dashboard/Timeline";

export default function DashboardPage() {
  const router = useRouter();
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<{
    type: "day" | "month" | "year";
    date: Date;
  } | null>(null);

  const isAdmin = true;

  const financialData = {
    balance: 12450.75,
    monthlyIncome: 8500.0,
    monthlyExpenses: 3680.25,
    savings: 4270.5,
    investments: 15230.8,
    creditLimit: 5000.0,
    creditUsed: 1250.0,
    monthlyBudget: 4000.0,
    budgetUsed: 2890.5,
  };

  const recentTransactions = [
    {
      id: 1,
      description: "Supermercado Extra",
      amount: -245.8,
      date: "2025-01-20",
      category: "Alimentação",
      type: "expense",
    },
    {
      id: 2,
      description: "Salário",
      amount: 8500.0,
      date: "2025-01-20",
      category: "Renda",
      type: "income",
    },
    {
      id: 3,
      description: "Netflix",
      amount: -29.9,
      date: "2025-01-19",
      category: "Entretenimento",
      type: "expense",
    },
    {
      id: 4,
      description: "Freelance",
      amount: 1200.0,
      date: "2025-01-18",
      category: "Renda Extra",
      type: "income",
    },
    {
      id: 5,
      description: "Posto de Gasolina",
      amount: -180.0,
      date: "2025-01-17",
      category: "Transporte",
      type: "expense",
    },
  ];

  const userCards = [
    {
      id: 1,
      bank: "Nubank",
      type: "Visa",
      number: "**** **** **** 1234",
      limit: 5000.0,
      used: 10250.0,
      color: "from-purple-600 to-purple-800",
    },
    {
      id: 2,
      bank: "Cartão Gold",
      type: "Mastercard",
      number: "**** **** **** 5678",
      limit: 8000.0,
      used: 2100.0,
      color: "from-amber-600 to-amber-800",
    },
    {
      id: 3,
      bank: "Cartão Black",
      type: "Visa",
      number: "**** **** **** 9012",
      limit: 15000.0,
      used: 7500.0,
      color: "from-gray-800 to-black",
    },
  ];

  const monthlyTrendData = [
    { month: "Jul", income: 7800, expenses: 3200 },
    { month: "Ago", income: 8200, expenses: 3500 },
    { month: "Set", income: 8000, expenses: 3800 },
    { month: "Out", income: 8500, expenses: 3600 },
    { month: "Nov", income: 8300, expenses: 3900 },
    { month: "Dez", income: 8500, expenses: 3680 },
  ];

  const expenseCategories = [
    { name: "Alimentação", value: 1200, color: "#f59e0b" },
    { name: "Transporte", value: 800, color: "#ef4444" },
    { name: "Entretenimento", value: 450, color: "#3b82f6" },
    { name: "Saúde", value: 600, color: "#10b981" },
    { name: "Outros", value: 630, color: "#8b5cf6" },
  ];

  const weeklySpending = [
    { day: "Seg", amount: 120 },
    { day: "Ter", amount: 85 },
    { day: "Qua", amount: 200 },
    { day: "Qui", amount: 150 },
    { day: "Sex", amount: 300 },
    { day: "Sáb", amount: 180 },
    { day: "Dom", amount: 90 },
  ];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % userCards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + userCards.length) % userCards.length
    );
  };

  const handlePeriodSelect = (period: {
    type: "day" | "month" | "year";
    date: Date;
  }) => {
    setSelectedPeriod(period);
  };

  return (
    <Layout>
      <section className="mx-auto w-screen max-w-full sm:px-6 pt-8 pb-12 ">
        <div className="mb-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <div className="break-inside-avoid">
              <DashboardCard title="CARTEIRA" icon={DollarSign}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-100 mb-1">
                      Saldo
                    </h2>
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
                          {financialData.monthlyExpenses.toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 }
                          )}
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
            </div>
            <div className="break-inside-avoid">
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
                          {new Date(transaction.date).toLocaleDateString(
                            "pt-BR",
                            {
                              month: "short",
                              day: "2-digit",
                            }
                          )}
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
                          {Math.abs(transaction.amount).toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 }
                          )}
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
            </div>
            <div className="break-inside-avoid">
              <DashboardCard title="MEUS CARTÕES" icon={CreditCardIcon}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div></div>
                    <div className="flex items-center justify-between  w-full gap-1">
                      <Button
                        variant="default"
                        size="lg"
                        onClick={prevCard}
                        className="h-8 w-8 p-0 text-neutral-400 hover:text-amber-300"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="default"
                        size="lg"
                        onClick={nextCard}
                        className="h-8 w-8 p-0 text-neutral-400 hover:text-amber-300"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${currentCardIndex * 100}%)`,
                      }}
                    >
                      {userCards.map((card) => (
                        <div key={card.id} className="w-full flex-shrink-0">
                          <CreditCardComponent card={card} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-1">
                    {userCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCardIndex(index)}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          index === currentCardIndex
                            ? "bg-amber-300"
                            : "bg-neutral-600"
                        }`}
                      />
                    ))}
                  </div>

                  <Link href="/cards">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 mt-3"
                    >
                      Gerenciar Cartões
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
            </div>

            <div className="break-inside-avoid">
              <Timeline
                onPeriodSelect={handlePeriodSelect}
                className="rounded-b-none"
              />
              <PeriodDetails
                period={selectedPeriod}
                className="border-t-0 rounded-t-none"
              />
            </div>

            <div className="break-inside-avoid">
              <DashboardCard title="TENDÊNCIA MENSAL" icon={TrendingUp}>
                <div className="space-y-4">
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrendData}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: "#a3a3a3" }}
                        />
                        <YAxis hide />
                        <Line
                          type="monotone"
                          dataKey="income"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", strokeWidth: 0, r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="expenses"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ fill: "#ef4444", strokeWidth: 0, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-neutral-400">Receitas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-neutral-400">Gastos</span>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="break-inside-avoid">
              <DashboardCard title="CATEGORIAS DE GASTOS" icon={PieChart}>
                <div className="space-y-4">
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie
                        dataKey={""}
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={50}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1">
                    {expenseCategories.slice(0, 3).map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-neutral-400">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-neutral-200">
                          R$ {category.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="break-inside-avoid">
              <DashboardCard title="GASTOS SEMANAIS" icon={BarChart3}>
                <div className="space-y-4">
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklySpending}>
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: "#a3a3a3" }}
                        />
                        <YAxis hide />
                        <Bar
                          dataKey="amount"
                          fill="#f59e0b"
                          radius={[2, 2, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-neutral-400">
                      Média diária: R${" "}
                      {(
                        weeklySpending.reduce(
                          (acc, day) => acc + day.amount,
                          0
                        ) / 7
                      ).toFixed(0)}
                    </p>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="break-inside-avoid">
              <DashboardCard title="INVESTIMENTOS" icon={TrendingUp}>
                <div className="flex items-center justify-center h-32 text-neutral-500">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Em breve...</p>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          {isFabOpen && (
            <div className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2">
              <div className="group relative">
                <Link href="/transactions">
                  <Button
                    size="sm"
                    className="bg-neutral-900 hover:bg-neutral-800 border border-amber-300/20 text-amber-300 shadow-lg rounded-full h-12 w-12 p-0"
                    onClick={() => setIsFabOpen(false)}
                  >
                    <Receipt className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-neutral-900 text-amber-300 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-amber-300/20">
                  Nova Transação
                </div>
              </div>

              <div className="group relative">
                <Link href="/cards">
                  <Button
                    size="sm"
                    className="bg-neutral-900 hover:bg-neutral-800 border border-amber-300/20 text-amber-300 shadow-lg rounded-full h-12 w-12 p-0"
                    onClick={() => setIsFabOpen(false)}
                  >
                    <CreditCardIcon className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-neutral-900 text-amber-300 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-amber-300/20">
                  Gerenciar Cartões
                </div>
              </div>

              <div className="group relative">
                <Link href="/bills">
                  <Button
                    size="sm"
                    className="bg-neutral-900 hover:bg-neutral-800 border border-amber-300/20 text-amber-300 shadow-lg rounded-full h-12 w-12 p-0"
                    onClick={() => setIsFabOpen(false)}
                  >
                    <Calendar className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-neutral-900 text-amber-300 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-amber-300/20">
                  Boletos e assinaturas
                </div>
              </div>

              {isAdmin && (
                <div className="group relative">
                  <Link href="/admin">
                    <Button
                      size="sm"
                      className="bg-amber-300 hover:bg-amber-200 text-black shadow-lg rounded-full h-12 w-12 p-0"
                      onClick={() => setIsFabOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                    </Button>
                  </Link>
                  <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-neutral-900 text-amber-300 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-amber-300/20">
                    Painel Admin
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            onClick={() => setIsFabOpen(!isFabOpen)}
            className="bg-amber-300 hover:bg-amber-200 text-black shadow-lg rounded-full h-14 w-14 p-0 transition-transform duration-200 hover:scale-110"
          >
            {isFabOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Plus className="h-6 w-6" />
            )}
          </Button>
        </div>
      </section>
    </Layout>
  );
}
