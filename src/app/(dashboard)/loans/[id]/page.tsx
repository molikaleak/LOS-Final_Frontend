"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Download,
  Edit,
  MoreHorizontal,
  User,
  Calendar,
  DollarSign,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function LoanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <>
      <Header>
        <div className="flex items-center gap-3">
          <Link href="/loans">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Loan Application: John Doe</h1>
              <Badge variant="secondary" className="text-xs">#{id}</Badge>
            </div>
          </div>
        </div>
      </Header>
      <div className="p-6 space-y-6">
        {/* Loan Summary Header */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Requested Principal</p>
                <p className="text-xl font-bold">$50,000</p>
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
                <p className="text-xl font-bold">24 Months</p>
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
                <p className="text-xl font-bold">Car Loan</p>
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
                <p className="text-xl font-bold text-success">Low</p>
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
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="repayments">Repayments</TabsTrigger>
                <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-4">
                {/* Approval Workflow */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Approval Workflow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      {[
                        { step: "Loan Officer", status: "completed", date: "Oct 24, 10:30 AM" },
                        { step: "Credit Analyst", status: "in-progress", date: "Started Oct 25" },
                        { step: "Risk Manager", status: "pending", date: "" },
                      ].map((item, i) => (
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
                                <p className="text-[11px] text-muted-foreground">{item.date}</p>
                              )}
                            </div>
                          </div>
                          {i < 2 && (
                            <div className="ml-4 mt-2 mb-2 h-6 border-l-2 border-dashed border-muted-foreground/30" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Risk Assessment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: "Credit Score", value: "742", score: 74, color: "bg-success" },
                        { label: "Debt-to-Income", value: "28%", score: 72, color: "bg-success" },
                        { label: "Collateral Value", value: "$62,000", score: 85, color: "bg-primary" },
                        { label: "Employment", value: "Stable", score: 90, color: "bg-primary" },
                      ].map((metric) => (
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
                        { label: "Full Name", value: "John Doe" },
                        { label: "Email", value: "john.doe@email.com" },
                        { label: "Phone", value: "+1 (555) 123-4567" },
                        { label: "Address", value: "123 Main St, Springfield, IL 62701" },
                        { label: "Employment", value: "Software Engineer at TechCorp" },
                        { label: "Annual Income", value: "$95,000" },
                        { label: "Date of Birth", value: "Jan 15, 1988" },
                        { label: "SSN (Last 4)", value: "****4567" },
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
                  <CardHeader><CardTitle className="text-base">Loan Details</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { label: "Loan Type", value: "Car Loan" },
                        { label: "Principal Amount", value: "$50,000" },
                        { label: "Interest Rate", value: "6.5% p.a." },
                        { label: "Loan Term", value: "24 Months" },
                        { label: "Monthly Payment", value: "$2,228.42" },
                        { label: "Total Repayment", value: "$53,482.08" },
                        { label: "Collateral", value: "2025 Toyota Camry" },
                        { label: "Insurance", value: "Required — GAP coverage" },
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
                      <Button size="sm"><FileText className="mr-2 h-4 w-4" />Upload Document</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "ID Proof - Passport.pdf", status: "Verified", date: "Oct 22" },
                        { name: "Income Statement - 2025.pdf", status: "Verified", date: "Oct 22" },
                        { name: "Bank Statements - 6mo.pdf", status: "Under Review", date: "Oct 24" },
                        { name: "Vehicle Registration.pdf", status: "Pending", date: "Oct 25" },
                      ].map((doc) => (
                        <div key={doc.name} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">Uploaded {doc.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={doc.status === "Verified" ? "default" : doc.status === "Pending" ? "outline" : "secondary"} className="text-xs">
                              {doc.status}
                            </Badge>
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

              <TabsContent value="workflow" className="mt-4">
                <Card>
                  <CardHeader><CardTitle className="text-base">Workflow History</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">Workflow timeline for this application.</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="repayments" className="mt-4">
                <Card>
                  <CardHeader><CardTitle className="text-base">Repayment Schedule</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">Repayment schedule will be generated upon disbursement.</p></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="audit" className="mt-4">
                <Card>
                  <CardHeader><CardTitle className="text-base">Audit Trail</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">Activity log for this application.</p></CardContent>
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
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-xs text-muted-foreground">Premium Customer</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Customer Since</p>
                    <p className="text-sm font-medium">March 2020</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active Loans</p>
                    <p className="text-sm font-medium">2</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Borrowed</p>
                    <p className="text-sm font-medium">$125,000</p>
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
                    &quot;Customer has maintained a healthy balance for the last 12 months.
                    Employment verification matches self-reported income. Ready for risk
                    assessment.&quot;
                  </p>
                  <p className="mt-2 text-xs font-medium text-foreground">
                    Sarah Jenkins, Senior Officer
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button className="flex-1" variant="default">Approve</Button>
              <Button className="flex-1" variant="destructive">Reject</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
