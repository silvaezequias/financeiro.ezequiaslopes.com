import DashboardCard from "@/components/dashboard/dashboard-card";
import { PieChart as PieCharIcon } from "lucide-react";
import { ResponsiveContainer, Pie, Cell, PieChart, Tooltip } from "recharts";
import { expenseCategories } from "./financialData";
import { jetmono } from "@/lib/fonts";

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-neutral-950 shadow-lg rounded p-2">
        <p className="text-sm font-medium text-neutral-200">{data.name}</p>
        <p className={`${jetmono.className} text-md text-amber-300`}>
          R$ {data.value}
        </p>
      </div>
    );
  }
  return null;
}

export default function ExpenseCategory() {
  if (expenseCategories.length === 0) {
    return (
      <DashboardCard title="CATEGORIAS DE GASTOS" icon={PieCharIcon}>
        <div className="text-sm text-neutral-400 py-5">
          Nenhuma categoria de gasto disponível.
        </div>
      </DashboardCard>
    );
  }

  const total = expenseCategories.reduce(
    (acc, category) => acc + category.value,
    0
  );

  const percentages = expenseCategories.map(
    (category) => (category.value / total) * 100
  );

  return (
    <DashboardCard title="CATEGORIAS DE GASTOS" icon={PieCharIcon}>
      <div className="space-y-4">
        <div className="h-fit">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                className="stroke-6 stroke-neutral-950"
                dataKey="value"
                nameKey="name"
                data={expenseCategories}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={100}
              >
                {expenseCategories.map((entry, index) => {
                  const maxValue = Math.max(...percentages);
                  const normalizedTo100 = percentages.map(
                    (val) => (val / maxValue) * 99
                  );
                  const color = `#fbbf24${Math.round(normalizedTo100[index])}`;
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1">
          {expenseCategories
            .sort((a, b) => b.value - a.value)
            .map((category, index) => {
              const maxValue = Math.max(...percentages);
              const normalizedTo100 = percentages.map(
                (val) => (val / maxValue) * 99
              );
              const color = `#fbbf24${Math.round(normalizedTo100[index])}`;
              return (
                <div
                  key={category.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-neutral-400">{category.name}</span>
                  </div>
                  <span className="text-neutral-200">R$ {category.value}</span>
                </div>
              );
            })}
        </div>
      </div>
    </DashboardCard>
  );
}
