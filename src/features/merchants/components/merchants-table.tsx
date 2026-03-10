"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Store, DollarSign, Users, TrendingUp, ExternalLink, MoreHorizontal } from "lucide-react";
import type { Merchant } from "../types";

export function MerchantsTable({ merchants }: { merchants: Merchant[] }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Merchants", value: "42", icon: Store, color: "text-primary", bg: "bg-primary/10" },
          { label: "Total Volume (MTD)", value: "$1.8M", icon: DollarSign, color: "text-success", bg: "bg-success/10" },
          { label: "Total Transactions", value: "4,890", icon: TrendingUp, color: "text-warning", bg: "bg-warning/10" },
          { label: "Active Customers", value: "3,200", icon: Users, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (<Card key={stat.label}><CardContent className="p-4 flex items-center gap-3"><div className={`rounded-lg p-2.5 ${stat.bg}`}><Icon className={`h-5 w-5 ${stat.color}`} /></div><div><p className="text-xs text-muted-foreground">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div></CardContent></Card>);
        })}
      </div>
      <Card>
        <Table>
          <TableHeader><TableRow><TableHead className="pl-6">Merchant</TableHead><TableHead>Category</TableHead><TableHead>Volume (MTD)</TableHead><TableHead>Transactions</TableHead><TableHead>Rate</TableHead><TableHead>Joined</TableHead><TableHead>Status</TableHead><TableHead className="pr-6">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {merchants.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="pl-6"><div><p className="font-medium">{m.name}</p><p className="text-xs text-muted-foreground">{m.id}</p></div></TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{m.category}</Badge></TableCell>
                <TableCell className="font-semibold">{m.volume}</TableCell>
                <TableCell>{m.transactions.toLocaleString()}</TableCell>
                <TableCell>{m.rate}</TableCell>
                <TableCell className="text-muted-foreground">{m.joined}</TableCell>
                <TableCell><StatusBadge status={m.status} /></TableCell>
                <TableCell className="pr-6"><div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="h-3.5 w-3.5" /></Button><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-3.5 w-3.5" /></Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
