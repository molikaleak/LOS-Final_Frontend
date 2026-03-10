"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3, TrendingUp, TrendingDown, AlertTriangle, Shield, DollarSign, PieChart,
} from "lucide-react";

export default function RiskAnalyticsPage() {
  return (
    <>
      <Header title="Risk Analytics Dashboard" />
      <div className="p-6 space-y-6">
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
                {[
                  { month: "Oct", par: 4.2, default: 2.1 },
                  { month: "Nov", par: 3.8, default: 1.9 },
                  { month: "Dec", par: 3.5, default: 1.7 },
                  { month: "Jan", par: 3.6, default: 1.8 },
                  { month: "Feb", par: 3.4, default: 1.6 },
                  { month: "Mar", par: 3.2, default: 1.8 },
                ].map((d) => (
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
                {[
                  { label: "Low Risk", value: 58, amount: "$24.6M", color: "bg-success" },
                  { label: "Medium Risk", value: 28, amount: "$11.9M", color: "bg-warning" },
                  { label: "High Risk", value: 11, amount: "$4.7M", color: "bg-destructive" },
                  { label: "Very High Risk", value: 3, amount: "$1.3M", color: "bg-destructive/60" },
                ].map((cat) => (
                  <div key={cat.label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
                        <span className="font-medium">{cat.label}</span>
                      </div>
                      <span className="text-muted-foreground">{cat.value}% • {cat.amount}</span>
                    </div>
                    <Progress value={cat.value} className="h-2" />
                  </div>
                ))}
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
                {[
                  { product: "Personal Loans", exposure: "$12.5M", par: "4.1%", trend: "down" },
                  { product: "Auto Loans", exposure: "$8.3M", par: "2.8%", trend: "down" },
                  { product: "Home Mortgages", exposure: "$15.2M", par: "1.5%", trend: "stable" },
                  { product: "Business Loans", exposure: "$4.8M", par: "5.2%", trend: "up" },
                  { product: "BNPL", exposure: "$1.7M", par: "3.5%", trend: "down" },
                ].map((p) => (
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
                {[
                  { indicator: "Late Payment Increase (>30 days)", severity: "Warning", count: 23, delta: "+5 this week" },
                  { indicator: "Credit Score Deterioration", severity: "Alert", count: 8, delta: "+2 this week" },
                  { indicator: "High DTI Ratio Applications", severity: "Watch", count: 15, delta: "-3 this week" },
                  { indicator: "Concentration Risk - Sector", severity: "Info", count: 2, delta: "Stable" },
                ].map((w) => (
                  <div key={w.indicator} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={w.severity === "Alert" ? "destructive" : w.severity === "Warning" ? "secondary" : "outline"}
                        className="text-[10px] w-16 justify-center"
                      >
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
      </div>
    </>
  );
}
