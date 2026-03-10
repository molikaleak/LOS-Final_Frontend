"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LoanTrendData } from "../types";

export function LoanTrendsChart({ data }: { data: LoanTrendData[] }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Loan Application Trends
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Week
            </Button>
            <Button variant="secondary" size="sm" className="h-7 text-xs">
              Month
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-[220px] items-end gap-2">
          {data.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                style={{ height: `${d.value}%` }}
              />
              <span className="text-[10px] text-muted-foreground">
                {d.month}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
