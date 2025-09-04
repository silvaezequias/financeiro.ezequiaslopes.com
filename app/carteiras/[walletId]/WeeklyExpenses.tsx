import DashboardCard from "@/components/dashboard/dashboard-card";
import { BarChart3 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { weeklySpending } from "./financialData";

export default function WeeklyExpenses() {
  return (
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
              <Bar dataKey="amount" fill="#fbbf24" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center">
          <p className="text-xs text-neutral-400">
            Média diária: R${" "}
            {(
              weeklySpending.reduce((acc, day) => acc + day.amount, 0) / 7
            ).toFixed(0)}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
