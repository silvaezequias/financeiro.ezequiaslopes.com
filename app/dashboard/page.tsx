"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { unauthorized, useRouter } from "next/navigation";
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
import PeriodDetails from "@/components/dashboard/Timeline/period-details";
import Layout, { AuthenticatedLayout } from "@/components/Layout";
import Timeline from "@/components/dashboard/Timeline";
import { isAdmin } from "./financialData";
import Wallet from "./Wallet";
import RecentTransactions from "./RecentTransactions";
import MyCards from "./MyCards";
import MonthlyTrend from "./MonthlyTrend";
import ExpenseCategory from "./ExpenseCategory";
import WeeklyExpenses from "./WeeklyExpenses";

export default function DashboardPage() {
  const router = useRouter();
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<{
    type: "day" | "month" | "year";
    date: Date;
  } | null>(null);

  const handlePeriodSelect = (period: {
    type: "day" | "month" | "year";
    date: Date;
  }) => {
    setSelectedPeriod(period);
  };

  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    unauthorized();
    return null;
  }

  useEffect(() => {
    alert(
      "Esta página está em desenvolvimento. As informações exibidas são apenas exemplos e não refletem dados reais."
    );
  }, []);

  return (
    <AuthenticatedLayout>
      <section className="mx-auto w-screen max-w-full sm:px-6 pt-8 pb-12 ">
        <div className="mb-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <div className="break-inside-avoid">
              <Wallet />
            </div>
            <div className="break-inside-avoid">
              <RecentTransactions />
            </div>
            <div className="break-inside-avoid">
              <MyCards />
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
              <MonthlyTrend />
            </div>

            <div className="break-inside-avoid">
              <ExpenseCategory />
            </div>

            <div className="break-inside-avoid">
              <WeeklyExpenses />
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
    </AuthenticatedLayout>
  );
}
