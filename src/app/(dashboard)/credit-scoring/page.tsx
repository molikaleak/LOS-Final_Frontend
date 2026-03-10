"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard, TrendingUp, BarChart3, Settings, RefreshCw, AlertTriangle,
} from "lucide-react";

const scoringModels = [
  { name: "FICO Standard", version: "v3.2", accuracy: 94.2, status: "Active", lastUpdated: "Feb 28, 2026" },
  { name: "Internal Risk Model", version: "v2.1", accuracy: 91.8, status: "Active", lastUpdated: "Mar 1, 2026" },
  { name: "Behavioral Score", version: "v1.5", accuracy: 88.5, status: "Active", lastUpdated: "Feb 15, 2026" },
  { name: "ML Ensemble Model", version: "v4.0", accuracy: 96.1, status: "Testing", lastUpdated: "Mar 5, 2026" },
];

const recentScores = [
  { id: "LN-8932", name: "Sarah Mitchell", fico: 742, internal: 735, behavioral: 780, final: 752, risk: "Medium" },
  { id: "LN-8931", name: "David Chen", fico: 810, internal: 795, behavioral: 820, final: 808, risk: "Low" },
  { id: "LN-8930", name: "Emily Rodriguez", fico: 695, internal: 680, behavioral: 710, final: 695, risk: "Medium-High" },
  { id: "LN-8929", name: "Michael Scott", fico: 780, internal: 770, behavioral: 790, final: 780, risk: "Low" },
];

export default function CreditScoringPage() {
  return (
    <>
      <Header title="Credit Scoring Engine" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Avg. Credit Score", value: "712", icon: CreditCard, color: "text-primary", bg: "bg-primary/10" },
            { label: "Model Accuracy", value: "94.2%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
            { label: "Scores Generated", value: "1,284", icon: BarChart3, color: "text-warning", bg: "bg-warning/10" },
            { label: "High Risk Flagged", value: "42", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`rounded-lg p-2.5 ${stat.bg}`}><Icon className={`h-5 w-5 ${stat.color}`} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scoring Models</CardTitle>
              <CardDescription>Active credit scoring models and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoringModels.map((model) => (
                  <div key={model.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{model.name}</p>
                        <Badge variant="outline" className="text-[10px]">{model.version}</Badge>
                        <Badge variant={model.status === "Active" ? "default" : "secondary"} className="text-[10px]">{model.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Accuracy</span>
                            <span className="font-semibold">{model.accuracy}%</span>
                          </div>
                          <Progress value={model.accuracy} className="h-1.5" />
                        </div>
                        <span className="text-[11px] text-muted-foreground">{model.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Score Distribution</CardTitle>
              <CardDescription>Distribution of credit scores across applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { range: "800-850 (Excellent)", count: 180, pct: 14, color: "bg-primary" },
                  { range: "750-799 (Very Good)", count: 320, pct: 25, color: "bg-primary/80" },
                  { range: "700-749 (Good)", count: 385, pct: 30, color: "bg-success" },
                  { range: "650-699 (Fair)", count: 250, pct: 19.5, color: "bg-warning" },
                  { range: "Below 650 (Poor)", count: 149, pct: 11.5, color: "bg-destructive" },
                ].map((bucket) => (
                  <div key={bucket.range} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{bucket.range}</span>
                      <span className="text-muted-foreground">{bucket.count} ({bucket.pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className={`h-full rounded-full ${bucket.color}`} style={{ width: `${bucket.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Credit Assessments</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Application</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>FICO</TableHead>
                <TableHead>Internal</TableHead>
                <TableHead>Behavioral</TableHead>
                <TableHead>Final Score</TableHead>
                <TableHead className="pr-6">Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentScores.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="pl-6 font-mono text-xs">{s.id}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.fico}</TableCell>
                  <TableCell>{s.internal}</TableCell>
                  <TableCell>{s.behavioral}</TableCell>
                  <TableCell className="font-bold">{s.final}</TableCell>
                  <TableCell className="pr-6">
                    <Badge
                      variant={s.risk === "Low" ? "default" : s.risk === "Medium" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {s.risk}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}
