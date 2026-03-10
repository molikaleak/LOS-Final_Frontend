"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, Shield, DollarSign } from "lucide-react";
import type { RiskAnalyticsData } from "../types";

export function RiskDashboard({ data }: { data: RiskAnalyticsData }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Portfolio at Risk", value: "3.2%", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", change: "-0.4%" },
          { label: "Default Rate", value: "1.8%", icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10", change: "+0.2%" },
          { label: "Avg. Risk Score", value: "72.5", icon: Shield, color: "text-primary", bg: "bg-primary/10", change: "+1.3" },
          { label: "Total Exposure", value: "$42.5M", icon: DollarSign, color: "text-success", bg: "bg-success/10", change: "+$2.1M" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change} vs last month</p>
                  </div>
                  <div className={`rounded-lg p-2.5 ${stat.bg}`}><Icon className={`h-5 w-5 ${stat.color}`} /></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Risk Trend Analysis</CardTitle>
            <CardDescription>Portfolio risk metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[250px] items-end gap-3">
              {data.trends.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end" style={{ height: "200px" }}>
                    <div className="flex-1 bg-warning/80 rounded-t" style={{ height: `${d.par * 40}px` }} />
                    <div className="flex-1 bg-destructive/80 rounded-t" style={{ height: `${d.default * 40}px` }} />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-warning/80" /><span className="text-xs">Portfolio at Risk</span></div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-destructive/80" /><span className="text-xs">Default Rate</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Categories</CardTitle>
            <CardDescription>Current portfolio distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.categories.map((cat, i) => {
                const colors = ["bg-success", "bg-warning", "bg-destructive", "bg-destructive/60"];
                const color = colors[i] || "bg-primary";
                return (
                <div key={cat.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                      <span className="font-medium">{cat.label}</span>
                    </div>
                    <span className="text-muted-foreground">{cat.value}% • {cat.amount}</span>
                  </div>
                  <Progress value={cat.value} className="h-2" />
                </div>
              )})}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Concentration by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.byProduct.map((p) => (
                <div key={p.product} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{p.product}</p>
                    <p className="text-xs text-muted-foreground">Exposure: {p.exposure}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{p.par}</p>
                      <p className="text-[11px] text-muted-foreground">PAR</p>
                    </div>
                    {p.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : p.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-success" />
                    ) : (
                      <div className="h-4 w-4 flex items-center justify-center text-muted-foreground">—</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Early Warning Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.earlyWarnings.map((w) => (
                <div key={w.indicator} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Badge variant={w.severity === "Alert" ? "destructive" : w.severity === "Warning" ? "secondary" : "outline"} className="text-[10px] w-16 justify-center">
                      {w.severity}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{w.indicator}</p>
                      <p className="text-[11px] text-muted-foreground">{w.delta}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">{w.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
