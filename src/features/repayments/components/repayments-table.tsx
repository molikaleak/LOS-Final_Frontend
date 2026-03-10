"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import { DollarSign, TrendingUp, AlertTriangle, Calendar } from "lucide-react";
import type { Repayment } from "../types";

export function RepaymentsTable({ repayments }: { repayments: Repayment[] }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Collected (MTD)", value: "$1.2M", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
          { label: "Collection Rate", value: "94.2%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
          { label: "Overdue Accounts", value: "18", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Upcoming (7 days)", value: "45", icon: Calendar, color: "text-warning", bg: "bg-warning/10" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (<Card key={stat.label}><CardContent className="p-4 flex items-center gap-3"><div className={`rounded-lg p-2.5 ${stat.bg}`}><Icon className={`h-5 w-5 ${stat.color}`} /></div><div><p className="text-xs text-muted-foreground">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div></CardContent></Card>);
        })}
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Repayments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
      </Tabs>
      <Card>
        <Table>
          <TableHeader><TableRow><TableHead className="pl-6">Repayment ID</TableHead><TableHead>Borrower</TableHead><TableHead>Loan Amount</TableHead><TableHead>Payment</TableHead><TableHead>Remaining</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead><TableHead className="pr-6">Action</TableHead></TableRow></TableHeader>
          <TableBody>
            {repayments.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="pl-6 font-mono text-xs">{r.id}</TableCell>
                <TableCell><div className="flex items-center gap-2"><Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">{r.initials}</AvatarFallback></Avatar><span className="font-medium text-sm">{r.name}</span></div></TableCell>
                <TableCell className="text-muted-foreground">{r.loan}</TableCell>
                <TableCell className="font-semibold">{r.amount}</TableCell>
                <TableCell className="text-muted-foreground">{r.remaining}</TableCell>
                <TableCell className="text-sm">{r.dueDate}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="pr-6"><Button variant="ghost" size="sm" className="h-7 text-xs">Details</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
