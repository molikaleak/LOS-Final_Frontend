"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { KPIStat } from "../types";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
};

const colorMap: Record<string, { text: string; bg: string }> = {
  FileText: { text: "text-primary", bg: "bg-primary/10" },
  CheckCircle2: { text: "text-success", bg: "bg-success/10" },
  XCircle: { text: "text-destructive", bg: "bg-destructive/10" },
  Clock: { text: "text-warning", bg: "bg-warning/10" },
  DollarSign: { text: "text-primary", bg: "bg-primary/10" },
};

export function KPICards({ stats }: { stats: KPIStat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] ?? FileText;
        const colors = colorMap[stat.icon] ?? { text: "text-primary", bg: "bg-primary/10" };
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                </div>
                <div className={`rounded-lg p-2.5 ${colors.bg}`}>
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
