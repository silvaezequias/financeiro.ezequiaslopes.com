import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  icon: Icon,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <Card
      className={`bg-neutral-950/90 border-neutral-800/50 rounded-xl max-w-full ${className}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-medium uppercase tracking-wider font-mono">
          <Icon className="h-5 w-5" />
          {title}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
