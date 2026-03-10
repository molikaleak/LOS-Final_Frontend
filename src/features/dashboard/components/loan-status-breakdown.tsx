"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import type { LoanStatusBreakdown } from "../types";

const colorMap: Record<string, string> = {
  Approved: "bg-primary",
  Pending: "bg-warning",
  Rejected: "bg-destructive",
};

export function LoanStatusBreakdownCard({
  data,
}: {
  data: LoanStatusBreakdown[];
}) {
  const total = data[0]?.total ?? 1;
  const approved = data.find((d) => d.label === "Approved")?.value ?? 0;
  const approvalRate = Math.round((approved / total) * 1000) / 10;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Loan Status</CardTitle>
        <CardDescription>Current distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 pt-2">
          {data.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      colorMap[item.label] || "bg-muted"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="text-muted-foreground">
                  {item.value} ({Math.round((item.value / item.total) * 100)}%)
                </span>
              </div>
              <Progress
                value={(item.value / item.total) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm font-semibold">{approvalRate}%</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Approval Rate</p>
        </div>
      </CardContent>
    </Card>
  );
}
