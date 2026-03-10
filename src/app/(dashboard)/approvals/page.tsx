"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2, Clock, XCircle, AlertCircle, ChevronRight, Filter,
} from "lucide-react";

const approvals = [
  { id: "LN-8930", name: "Emily Rodriguez", initials: "ER", amount: "$320,000", type: "Home Mortgage", step: "Credit Review", priority: "High", submitted: "2h ago", score: 695 },
  { id: "LN-8927", name: "Angela Martin", initials: "AM", amount: "$280,000", type: "Home Mortgage", step: "Risk Assessment", priority: "Medium", submitted: "4h ago", score: 720 },
  { id: "LN-8932", name: "Sarah Mitchell", initials: "SM", amount: "$25,000", type: "Personal Loan", step: "Document Verification", priority: "Normal", submitted: "6h ago", score: 742 },
  { id: "LN-8935", name: "Kevin Brown", initials: "KB", amount: "$45,000", type: "Auto Loan", step: "Final Approval", priority: "High", submitted: "1d ago", score: 680 },
  { id: "LN-8936", name: "Oscar Martinez", initials: "OM", amount: "$95,000", type: "Business Loan", step: "Credit Review", priority: "Medium", submitted: "1d ago", score: 760 },
];

const priorityColors: Record<string, string> = {
  High: "bg-destructive",
  Medium: "bg-warning",
  Normal: "bg-success",
};

export default function ApprovalsPage() {
  return (
    <>
      <Header title="Approvals Workflow" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Pending Review", value: "12", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
            { label: "Approved Today", value: "8", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
            { label: "Rejected Today", value: "2", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
            { label: "Escalated", value: "3", icon: AlertCircle, color: "text-primary", bg: "bg-primary/10" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All (12)</TabsTrigger>
              <TabsTrigger value="credit">Credit Review (4)</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment (3)</TabsTrigger>
              <TabsTrigger value="document">Doc Verification (3)</TabsTrigger>
              <TabsTrigger value="final">Final Approval (2)</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm"><Filter className="mr-2 h-3.5 w-3.5" />Filter</Button>
        </div>

        <div className="space-y-3">
          {approvals.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{item.name}</p>
                        <span className="text-xs text-muted-foreground font-mono">#{item.id}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.type} • {item.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Current Step</p>
                      <Badge variant="secondary" className="text-xs mt-0.5">{item.step}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Credit Score</p>
                      <p className={`text-sm font-semibold ${item.score >= 750 ? "text-success" : item.score >= 650 ? "text-warning" : "text-destructive"}`}>
                        {item.score}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${priorityColors[item.priority]}`} />
                      <span className="text-xs text-muted-foreground">{item.priority}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.submitted}</span>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-8">Approve</Button>
                      <Button size="sm" variant="outline" className="h-8">Review</Button>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
