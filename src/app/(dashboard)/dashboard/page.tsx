"use client";

import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  Users,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Applications",
    value: "1,284",
    change: "+12.5%",
    trend: "up" as const,
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Approved Loans",
    value: "856",
    change: "+8.3%",
    trend: "up" as const,
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Rejected Loans",
    value: "142",
    change: "-3.1%",
    trend: "down" as const,
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "Pending Approvals",
    value: "286",
    change: "+5.2%",
    trend: "up" as const,
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Portfolio Value",
    value: "$42.5M",
    change: "+15.7%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const recentApplications = [
  {
    id: "LN-8932",
    name: "Sarah Mitchell",
    initials: "SM",
    type: "Personal Loan",
    amount: "$25,000",
    status: "Under Review",
    date: "Mar 10, 2026",
    score: 742,
  },
  {
    id: "LN-8931",
    name: "David Chen",
    initials: "DC",
    type: "Auto Loan",
    amount: "$35,500",
    status: "Approved",
    date: "Mar 9, 2026",
    score: 810,
  },
  {
    id: "LN-8930",
    name: "Emily Rodriguez",
    initials: "ER",
    type: "Home Mortgage",
    amount: "$320,000",
    status: "Documents Pending",
    date: "Mar 9, 2026",
    score: 695,
  },
  {
    id: "LN-8929",
    name: "Michael Scott",
    initials: "MS",
    type: "Business Loan",
    amount: "$75,000",
    status: "Approved",
    date: "Mar 8, 2026",
    score: 780,
  },
  {
    id: "LN-8928",
    name: "Pam Beesly",
    initials: "PB",
    type: "Personal Loan",
    amount: "$12,000",
    status: "Rejected",
    date: "Mar 8, 2026",
    score: 580,
  },
];

const pendingTasks = [
  {
    title: "Document Verification",
    description: "Appl. #LN-8902 • Michael Scott",
    priority: "high",
    time: "2h ago",
  },
  {
    title: "Credit Score Override",
    description: "Appl. #LN-8915 • Pam Beesly",
    priority: "medium",
    time: "4h ago",
  },
  {
    title: "Income Proof Approval",
    description: "Appl. #LN-8921 • Jim Halpert",
    priority: "high",
    time: "6h ago",
  },
  {
    title: "Security Valuation",
    description: "Appl. #LN-8922 • Dwight Schrute",
    priority: "low",
    time: "1d ago",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "Approved": "default",
  "Under Review": "secondary",
  "Documents Pending": "outline",
  "Rejected": "destructive",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={statusVariant[status] || "secondary"} className="text-xs font-medium">
      {status}
    </Badge>
  );
}

function PriorityDot({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    high: "bg-destructive",
    medium: "bg-warning",
    low: "bg-success",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${colors[priority] || "bg-muted"}`} />;
}

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="relative overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg p-2.5 ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        stat.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row - Placeholder cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Loan Application Trends</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Week</Button>
                  <Button variant="secondary" size="sm" className="h-7 text-xs">Month</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Year</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-[220px] items-end gap-2">
                {[65, 45, 80, 55, 72, 90, 68, 85, 60, 78, 92, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Loan Status</CardTitle>
              <CardDescription>Current distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 pt-2">
                {[
                  { label: "Approved", value: 856, total: 1284, color: "bg-primary" },
                  { label: "Pending", value: 286, total: 1284, color: "bg-warning" },
                  { label: "Rejected", value: 142, total: 1284, color: "bg-destructive" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {item.value} ({Math.round((item.value / item.total) * 100)}%)
                      </span>
                    </div>
                    <Progress
                      value={(item.value / item.total) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm font-semibold">66.7%</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Approval Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Applications */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Applications</CardTitle>
                <Link href="/loans">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-primary">
                    View All
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Applicant</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((app) => (
                    <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {app.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{app.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        {app.id}
                      </TableCell>
                      <TableCell>{app.type}</TableCell>
                      <TableCell className="font-semibold">{app.amount}</TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${
                            app.score >= 750
                              ? "text-success"
                              : app.score >= 650
                                ? "text-warning"
                                : "text-destructive"
                          }`}
                        >
                          {app.score}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="pr-6 text-right text-muted-foreground text-sm">
                        {app.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Pending Tasks</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {pendingTasks.length} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {pendingTasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <PriorityDot priority={task.priority} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {task.description}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">
                      {task.time}
                    </span>
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
