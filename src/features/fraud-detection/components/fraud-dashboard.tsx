"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Eye, Flag, TrendingUp, AlertCircle } from "lucide-react";
import type { FraudData } from "../types";

const severityColors: Record<string, "destructive" | "secondary" | "outline" | "default"> = {
  Critical: "destructive",
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
};

export function FraudDashboard({ data }: { data: FraudData }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Alerts", value: "23", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Blocked Today", value: "5", icon: Shield, color: "text-primary", bg: "bg-primary/10" },
          { label: "Under Review", value: "12", icon: Eye, color: "text-warning", bg: "bg-warning/10" },
          { label: "Detection Rate", value: "98.5%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`rounded-lg p-2.5 ${stat.bg}`}><Icon className={`h-5 w-5 ${stat.color}`} /></div>
                <div><p className="text-xs text-muted-foreground">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Fraud Alerts</CardTitle>
              <Tabs defaultValue="all">
                <TabsList className="h-8">
                  <TabsTrigger value="all" className="text-xs h-6">All</TabsTrigger>
                  <TabsTrigger value="critical" className="text-xs h-6">Critical</TabsTrigger>
                  <TabsTrigger value="investigating" className="text-xs h-6">Investigating</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Alert ID</TableHead><TableHead>Type</TableHead><TableHead>Application</TableHead><TableHead>Severity</TableHead><TableHead>Score</TableHead><TableHead>Status</TableHead><TableHead className="pr-6">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.alerts.map((alert) => (
                <TableRow key={alert.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="pl-6 font-mono text-xs">{alert.id}</TableCell>
                  <TableCell className="font-medium text-sm">{alert.type}</TableCell>
                  <TableCell><div><p className="text-xs text-muted-foreground font-mono">{alert.application}</p><p className="text-sm">{alert.name}</p></div></TableCell>
                  <TableCell><Badge variant={severityColors[alert.severity]} className="text-[10px]">{alert.severity}</Badge></TableCell>
                  <TableCell><span className={`font-bold ${alert.score >= 80 ? "text-destructive" : alert.score >= 60 ? "text-warning" : "text-muted-foreground"}`}>{alert.score}</span></TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{alert.status}</Badge></TableCell>
                  <TableCell className="pr-6 text-xs text-muted-foreground">{alert.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Fraud by Type</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.byType.map((item) => (
                  <div key={item.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.type}</span><span className="text-muted-foreground">{item.count} ({item.pct}%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-destructive/70" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm h-9"><Flag className="mr-2 h-4 w-4 text-destructive" />Flag Suspicious Application</Button>
              <Button variant="outline" className="w-full justify-start text-sm h-9"><Shield className="mr-2 h-4 w-4 text-primary" />Update Fraud Rules</Button>
              <Button variant="outline" className="w-full justify-start text-sm h-9"><AlertCircle className="mr-2 h-4 w-4 text-warning" />Generate Report</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
