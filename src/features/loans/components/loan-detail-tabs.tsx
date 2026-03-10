"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  CheckCircle2,
  Clock,
  FileText,
  Download,
  DollarSign,
  Calendar,
  Shield,
} from "lucide-react";
import type { LoanDetail } from "../types";

export function LoanDetailContent({ loan }: { loan: LoanDetail }) {
  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Requested Principal</p>
              <p className="text-xl font-bold">{loan.loan.amount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fixed Duration</p>
              <p className="text-xl font-bold">{loan.loan.term}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Loan Type</p>
              <p className="text-xl font-bold">{loan.loan.type}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <p className="text-xl font-bold text-success">{loan.loan.riskLevel}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
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
                  <CardTitle className="text-base">Approval Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {loan.workflow.map((item, i) => (
                      <div key={i} className="flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              item.status === "completed"
                                ? "bg-success text-success-foreground"
                                : item.status === "in-progress"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {item.status === "completed" ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : item.status === "in-progress" ? (
                              <Clock className="h-4 w-4" />
                            ) : (
                              <span className="text-xs font-bold">{i + 1}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.step}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.status === "completed"
                                ? "Completed"
                                : item.status === "in-progress"
                                  ? "In Progress"
                                  : "Pending"}
                            </p>
                            {item.date && (
                              <p className="text-[11px] text-muted-foreground">
                                {item.date}
                              </p>
                            )}
                          </div>
                        </div>
                        {i < loan.workflow.length - 1 && (
                          <div className="ml-4 mt-2 mb-2 h-6 border-l-2 border-dashed border-muted-foreground/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Risk Assessment Summary</CardTitle>
                </CardHeader>
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
                <CardHeader>
                  <CardTitle className="text-base">Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", value: loan.applicant.name },
                      { label: "Email", value: loan.applicant.email },
                      { label: "Phone", value: loan.applicant.phone },
                      { label: "Address", value: loan.applicant.address },
                      { label: "Employment", value: loan.applicant.employment },
                      { label: "Annual Income", value: loan.applicant.annualIncome },
                      { label: "Date of Birth", value: loan.applicant.dob },
                      { label: "SSN (Last 4)", value: loan.applicant.ssnLast4 },
                    ].map((field) => (
                      <div key={field.label}>
                        <p className="text-xs text-muted-foreground">{field.label}</p>
                        <p className="text-sm font-medium mt-1">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="loan-details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Loan Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Loan Type", value: loan.loan.type },
                      { label: "Principal Amount", value: loan.loan.amount },
                      { label: "Interest Rate", value: loan.loan.rate },
                      { label: "Loan Term", value: loan.loan.term },
                      { label: "Monthly Payment", value: loan.loan.monthlyPayment },
                      { label: "Total Repayment", value: loan.loan.totalRepayment },
                      { label: "Collateral", value: loan.loan.collateral },
                      { label: "Insurance", value: loan.loan.insurance },
                    ].map((field) => (
                      <div key={field.label}>
                        <p className="text-xs text-muted-foreground">{field.label}</p>
                        <p className="text-sm font-medium mt-1">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Documents</CardTitle>
                    <Button size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loan.documents.map((doc) => (
                      <div
                        key={doc.name}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded {doc.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={doc.status} />
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {loan.applicant.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{loan.applicant.name}</h3>
                  <p className="text-xs text-muted-foreground">Premium Customer</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Customer Since</p>
                  <p className="text-sm font-medium">{loan.applicant.customerSince}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Loans</p>
                  <p className="text-sm font-medium">{loan.applicant.activeLoans}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Borrowed</p>
                  <p className="text-sm font-medium">{loan.applicant.totalBorrowed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Auditor Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &quot;Customer has maintained a healthy balance for the last 12
                  months. Employment verification matches self-reported income.
                  Ready for risk assessment.&quot;
                </p>
                <p className="mt-2 text-xs font-medium text-foreground">
                  Sarah Jenkins, Senior Officer
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1" variant="default">
              Approve
            </Button>
            <Button className="flex-1" variant="destructive">
              Reject
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
