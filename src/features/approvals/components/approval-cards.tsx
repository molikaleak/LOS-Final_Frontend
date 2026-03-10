"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2, Clock, XCircle, AlertCircle, ChevronRight, Filter, AlertTriangle, UserCheck, ShieldClose
} from "lucide-react";
import type { Approval } from "../types";

const priorityColors: Record<string, string> = {
  High: "bg-destructive",
  Medium: "bg-warning",
  Normal: "bg-success",
};

export function ApprovalCards({ approvals }: { approvals: Approval[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const creditCount = approvals.filter(a => a.step === "Credit Review").length;
  const riskCount = approvals.filter(a => a.step === "Risk Assessment").length;
  const docCount = approvals.filter(a => a.step === "Doc Verification").length;
  const finalCount = approvals.filter(a => a.step === "Final Approval").length;

  const filteredApprovals = approvals.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "credit" && item.step === "Credit Review") return true;
    if (activeTab === "risk" && item.step === "Risk Assessment") return true;
    if (activeTab === "document" && item.step === "Doc Verification") return true;
    if (activeTab === "final" && item.step === "Final Approval") return true;
    return false;
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Pending Review", value: approvals.length.toString(), icon: Clock, color: "text-warning", bg: "bg-warning/10" },
          { label: "Approved Today", value: "8", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Rejected Today", value: "2", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Escalated", value: "3", icon: AlertCircle, color: "text-primary", bg: "bg-primary/10" },
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

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({approvals.length})</TabsTrigger>
            <TabsTrigger value="credit">Credit Review ({creditCount})</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment ({riskCount})</TabsTrigger>
            <TabsTrigger value="document">Doc Verification ({docCount})</TabsTrigger>
            <TabsTrigger value="final">Final Approval ({finalCount})</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm"><Filter className="mr-2 h-3.5 w-3.5" />Filter</Button>
      </div>

      <div className="space-y-3">
        {filteredApprovals.length > 0 ? (
          filteredApprovals.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4" style={{ 
              borderLeftColor: item.priority === "High" ? "var(--destructive)" : item.priority === "Medium" ? "var(--warning)" : "var(--success)" 
            }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{item.initials}</AvatarFallback>
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
                      <p className={`text-sm font-semibold ${item.score >= 750 ? "text-success" : item.score >= 650 ? "text-warning" : "text-destructive"}`}>{item.score}</p>
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/20">
            <CheckCircle2 className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <h3 className="font-semibold text-lg">No Approvals Needed</h3>
            <p className="text-sm text-muted-foreground mt-1">There are no items waiting in this queue.</p>
          </div>
        )}
      </div>
    </>
  );
}
