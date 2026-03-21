"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/shared/status-badge";
import { processApproval } from "@/features/approvals/actions/process-approval";
import {
  CheckCircle2, Clock, FileText, Download, DollarSign, Calendar, Shield, Loader2, AlertCircle
} from "lucide-react";
import type { ApprovalDetail } from "../types";

export function ApprovalDetailContent({ approval }: { approval: ApprovalDetail }) {
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState("");
  const loan = approval.loanDetail;

  const handleDecision = (action: "approve" | "reject") => {
    startTransition(() => {
      processApproval(approval.id, action, notes);
    });
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5"><DollarSign className="h-5 w-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Requested Principal</p><p className="text-xl font-bold">{loan.loan.amount}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5"><Calendar className="h-5 w-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Fixed Duration</p><p className="text-xl font-bold">{loan.loan.term}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5"><FileText className="h-5 w-5 text-primary" /></div>
            <div><p className="text-xs text-muted-foreground">Loan Type</p><p className="text-xl font-bold">{loan.loan.type}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2.5"><Shield className="h-5 w-5 text-success" /></div>
            <div><p className="text-xs text-muted-foreground">Credit Score</p><p className="text-xl font-bold text-success">{approval.score}</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="customer">Customer Info</TabsTrigger>
              <TabsTrigger value="loan-details">Loan Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Approval Stage Tracking</CardTitle>
                    <Badge variant="secondary">{approval.step}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {loan.workflow.map((item, i) => (
                      <div key={i} className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${item.status === "completed" ? "bg-success text-success-foreground" : item.status === "in-progress" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {item.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : item.status === "in-progress" ? <Clock className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.step}</p>
                            <p className="text-xs text-muted-foreground">{item.status === "completed" ? "Completed" : item.status === "in-progress" ? "In Progress" : "Pending"}</p>
                          </div>
                        </div>
                        {i < loan.workflow.length - 1 && <div className="ml-4 mt-2 mb-2 h-6 border-l-2 border-dashed border-muted-foreground/30" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Risk Assessment Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {loan.riskAssessment.map((metric) => (
                      <div key={metric.label} className="space-y-2">
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                        <p className="text-lg font-semibold">{metric.value}</p>
                        <Progress value={metric.score} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customer" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Customer Information</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", value: loan.applicant.name }, { label: "Email", value: loan.applicant.email },
                      { label: "Phone", value: loan.applicant.phone }, { label: "Address", value: loan.applicant.address },
                      { label: "Employment", value: loan.applicant.employment }, { label: "Annual Income", value: loan.applicant.annualIncome },
                      { label: "SSN (Last 4)", value: loan.applicant.ssnLast4 },
                    ].map((field) => (
                      <div key={field.label}><p className="text-xs text-muted-foreground">{field.label}</p><p className="text-sm font-medium mt-1">{field.value}</p></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="loan-details" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Loan Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Loan Type", value: loan.loan.type }, { label: "Principal Amount", value: loan.loan.amount },
                      { label: "Interest Rate", value: loan.loan.rate }, { label: "Loan Term", value: loan.loan.term },
                      { label: "Monthly Payment", value: loan.loan.monthlyPayment }, { label: "Total Repayment", value: loan.loan.totalRepayment },
                      { label: "Collateral", value: loan.loan.collateral }, { label: "Insurance", value: loan.loan.insurance },
                    ].map((field) => (
                      <div key={field.label}><p className="text-xs text-muted-foreground">{field.label}</p><p className="text-sm font-medium mt-1">{field.value}</p></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Documents</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loan.documents.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div><p className="text-sm font-medium">{doc.name}</p><p className="text-xs text-muted-foreground">Uploaded {doc.date}</p></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={doc.status} />
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/50 shadow-md">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="flex flex-col gap-1 items-center justify-center text-center">
                <span className="text-sm text-muted-foreground font-normal">Make Decision For</span>
                <span className="text-xl font-bold">{approval.id}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{approval.initials}</AvatarFallback></Avatar>
                  <span className="font-semibold text-sm">{approval.name}</span>
                </div>
                <Badge variant={approval.priority === "High" ? "destructive" : "secondary"}>{approval.priority} Priority</Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Review Notes</label>
                <Textarea 
                  placeholder="Explain the reason for your decision..." 
                  className="min-h-[120px]" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  disabled={isPending}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-success-foreground" 
                  disabled={isPending || notes.length < 5} 
                  onClick={() => handleDecision("approve")}
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve"}
                </Button>
                <Button 
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
                  disabled={isPending || notes.length < 5} 
                  onClick={() => handleDecision("reject")}
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reject"}
                </Button>
              </div>
              
              <div className="flexitems-start gap-2 text-[11px] text-muted-foreground bg-warning/10 text-warning-foreground p-2 rounded-md">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5" />
                <span>Notes (min 5 characters) are required before making a final decision. Decision cannot be reversed.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
