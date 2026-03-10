"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign, CheckCircle2, Clock, AlertCircle, Send,
} from "lucide-react";

const disbursements = [
  { id: "DSB-4521", loanId: "LN-8929", name: "Michael Scott", initials: "MS", amount: "$75,000", method: "Bank Transfer", status: "Completed", date: "Mar 8, 2026" },
  { id: "DSB-4520", loanId: "LN-8927", name: "Jim Halpert", initials: "JH", amount: "$42,000", method: "Direct Deposit", status: "Completed", date: "Mar 7, 2026" },
  { id: "DSB-4519", loanId: "LN-8925", name: "Dwight Schrute", initials: "DS", amount: "$150,000", method: "Bank Transfer", status: "Processing", date: "Mar 6, 2026" },
  { id: "DSB-4518", loanId: "LN-8920", name: "Stanley Hudson", initials: "SH", amount: "$30,000", method: "Check", status: "Pending Approval", date: "Mar 5, 2026" },
  { id: "DSB-4517", loanId: "LN-8918", name: "Phyllis Vance", initials: "PV", amount: "$85,000", method: "Bank Transfer", status: "Completed", date: "Mar 4, 2026" },
];

const statusColors: Record<string, "default" | "secondary" | "outline"> = {
  "Completed": "default",
  "Processing": "secondary",
  "Pending Approval": "outline",
};

export default function DisbursementPage() {
  return (
    <>
      <Header title="Loan Disbursement" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Disbursed (MTD)", value: "$2.8M", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
            { label: "Completed", value: "45", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
            { label: "Processing", value: "8", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
            { label: "Pending Approval", value: "3", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
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

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Disbursement ID</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Loan ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disbursements.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="pl-6 font-mono text-xs">{d.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">{d.initials}</AvatarFallback></Avatar>
                      <span className="font-medium text-sm">{d.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{d.loanId}</TableCell>
                  <TableCell className="font-semibold">{d.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{d.method}</TableCell>
                  <TableCell><Badge variant={statusColors[d.status]} className="text-xs">{d.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{d.date}</TableCell>
                  <TableCell className="pr-6">
                    {d.status === "Pending Approval" ? (
                      <Button size="sm" className="h-7 text-xs"><Send className="mr-1.5 h-3 w-3" />Disburse</Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                    )}
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
