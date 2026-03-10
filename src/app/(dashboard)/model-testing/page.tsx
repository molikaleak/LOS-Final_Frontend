"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  FlaskConical, Play, BarChart3, Settings, Download, RefreshCw,
} from "lucide-react";

const testResults = [
  { model: "FICO Standard v3.2", accuracy: 94.2, precision: 92.1, recall: 95.8, f1: 93.9, auc: 0.967, status: "Passed" },
  { model: "Internal Risk v2.1", accuracy: 91.8, precision: 90.5, recall: 93.1, f1: 91.8, auc: 0.945, status: "Passed" },
  { model: "Behavioral v1.5", accuracy: 88.5, precision: 87.2, recall: 89.8, f1: 88.5, auc: 0.921, status: "Warning" },
  { model: "ML Ensemble v4.0", accuracy: 96.1, precision: 95.4, recall: 96.8, f1: 96.1, auc: 0.982, status: "Testing" },
];

export default function ModelTestingPage() {
  return (
    <>
      <Header title="Model Testing & Simulation" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Models Under Test", value: "4", icon: FlaskConical, color: "text-primary", bg: "bg-primary/10" },
            { label: "Tests Run (MTD)", value: "128", icon: Play, color: "text-success", bg: "bg-success/10" },
            { label: "Avg. Accuracy", value: "92.7%", icon: BarChart3, color: "text-warning", bg: "bg-warning/10" },
            { label: "Active Simulations", value: "2", icon: RefreshCw, color: "text-primary", bg: "bg-primary/10" },
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

        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Test Results</CardTitle>
              <CardDescription>Latest model performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div key={result.model} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{result.model}</p>
                        <Badge
                          variant={result.status === "Passed" ? "default" : result.status === "Warning" ? "secondary" : "outline"}
                          className="text-[10px]"
                        >
                          {result.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">AUC: {result.auc}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: "Accuracy", value: result.accuracy },
                        { label: "Precision", value: result.precision },
                        { label: "Recall", value: result.recall },
                        { label: "F1 Score", value: result.f1 },
                      ].map((metric) => (
                        <div key={metric.label} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{metric.label}</span>
                            <span className="font-semibold">{metric.value}%</span>
                          </div>
                          <Progress value={metric.value} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Run Simulation</CardTitle>
              <CardDescription>Configure and run a new model test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Model</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Choose model" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fico">FICO Standard v3.2</SelectItem>
                    <SelectItem value="internal">Internal Risk v2.1</SelectItem>
                    <SelectItem value="behavioral">Behavioral v1.5</SelectItem>
                    <SelectItem value="ensemble">ML Ensemble v4.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Test Dataset</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Choose dataset" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production (Last 30 days)</SelectItem>
                    <SelectItem value="historical">Historical (2025)</SelectItem>
                    <SelectItem value="synthetic">Synthetic Test Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sampleSize">Sample Size</Label>
                <Input id="sampleSize" type="number" defaultValue="1000" />
              </div>
              <div className="space-y-2">
                <Label>Scenario</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Choose scenario" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal Conditions</SelectItem>
                    <SelectItem value="stress">Stress Test</SelectItem>
                    <SelectItem value="recession">Recession Scenario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <Button className="w-full"><Play className="mr-2 h-4 w-4" />Run Simulation</Button>
              <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4" />Export Results</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
