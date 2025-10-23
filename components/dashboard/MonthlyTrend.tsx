import DashboardCard from "@/components/dashboard/dashboard-card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { monthlyTrendData } from "./financialData";

export default function MonthlyTrend() {
  return (
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
  );
}
