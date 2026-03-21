"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { DollarSign, CheckCircle2, Clock, AlertCircle, Send } from "lucide-react";
import type { Disbursement } from "../types";

export function DisbursementTable({ disbursements }: { disbursements: Disbursement[] }) {
  return (
    <>
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
                <div><p className="text-xs text-muted-foreground">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Disbursement ID</TableHead><TableHead>Borrower</TableHead><TableHead>Loan ID</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disbursements.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="pl-6 font-mono text-xs">{d.id}</TableCell>
                <TableCell><div className="flex items-center gap-2"><Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">{d.initials}</AvatarFallback></Avatar><span className="font-medium text-sm">{d.name}</span></div></TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{d.loanId}</TableCell>
                <TableCell className="font-semibold">{d.amount}</TableCell>
                <TableCell className="text-muted-foreground">{d.method}</TableCell>
                <TableCell><StatusBadge status={d.status} /></TableCell>
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
    </>
  );
}
