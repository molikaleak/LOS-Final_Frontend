"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Search, Download, ClipboardList, ChevronLeft, ChevronRight,
  Shield, FileText, Settings, LogIn,
} from "lucide-react";
import type { AuditLog } from "../types";

const categoryIcons: Record<string, React.ElementType> = {
  "Loan Action": FileText,
  "Risk Update": Shield,
  "Compliance": Shield,
  "System": Settings,
  "Authentication": LogIn,
  "Admin": Settings,
  "Document": FileText,
};

const categoryColors: Record<string, string> = {
  "Loan Action": "bg-primary/10 text-primary",
  "Risk Update": "bg-warning/10 text-warning",
  "Compliance": "bg-destructive/10 text-destructive",
  "System": "bg-muted text-muted-foreground",
  "Authentication": "bg-success/10 text-success",
  "Admin": "bg-primary/10 text-primary",
  "Document": "bg-primary/10 text-primary",
};

export function AuditLogsTable({ logs }: { logs: AuditLog[] }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Logs (Today)", value: "342" },
          { label: "User Actions", value: "285" },
          { label: "System Events", value: "57" },
          { label: "Security Flags", value: "3" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-9 h-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="loan">Loan Actions</SelectItem>
                  <SelectItem value="risk">Risk Updates</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="today">
                <SelectTrigger className="w-[140px] h-9"><SelectValue placeholder="Time Range" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="h-9"><Download className="mr-2 h-3.5 w-3.5" />Export</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Timestamp</TableHead><TableHead>Log ID</TableHead><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Target</TableHead><TableHead>Category</TableHead><TableHead className="pr-6">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => {
              const Icon = categoryIcons[log.category] || ClipboardList;
              return (
                <TableRow key={log.id} className="hover:bg-muted/50">
                  <TableCell className="pl-6 text-sm text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell className="font-mono text-xs">{log.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${categoryColors[log.category] || "bg-muted"}`}><Icon className="h-3 w-3" /></div>
                      <span className={`text-sm ${log.user === "System" ? "text-muted-foreground italic" : "font-medium"}`}>{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm">{log.action}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.target}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{log.category}</Badge></TableCell>
                  <TableCell className="pr-6 text-xs text-muted-foreground font-mono">{log.ip}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t px-6 py-3">
          <p className="text-sm text-muted-foreground">Showing 1-10 of 342 logs</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
            <Button variant="outline" size="sm" className="h-8"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>
    </>
  );
}
