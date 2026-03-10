"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Search, Download, Filter, ClipboardList, ChevronLeft, ChevronRight,
  User, Shield, FileText, Settings, LogIn, Edit,
} from "lucide-react";

const logs = [
  { id: "AUD-12845", timestamp: "Mar 10, 2026 09:15:22", user: "Marcus Johnson", action: "Approved Loan", target: "LN-8929", category: "Loan Action", ip: "192.168.1.45" },
  { id: "AUD-12844", timestamp: "Mar 10, 2026 09:10:05", user: "Sarah Jenkins", action: "Updated Credit Score", target: "LN-8932", category: "Risk Update", ip: "192.168.1.50" },
  { id: "AUD-12843", timestamp: "Mar 10, 2026 08:55:18", user: "David Park", action: "Flagged for Review", target: "LN-8930", category: "Compliance", ip: "192.168.1.55" },
  { id: "AUD-12842", timestamp: "Mar 10, 2026 08:42:31", user: "System", action: "Auto-Generated Report", target: "RPT-0342", category: "System", ip: "—" },
  { id: "AUD-12841", timestamp: "Mar 10, 2026 08:30:00", user: "Marcus Johnson", action: "Login", target: "—", category: "Authentication", ip: "192.168.1.45" },
  { id: "AUD-12840", timestamp: "Mar 10, 2026 08:15:42", user: "Maria Garcia", action: "Rejected Loan", target: "LN-8928", category: "Loan Action", ip: "192.168.1.60" },
  { id: "AUD-12839", timestamp: "Mar 9, 2026 17:45:10", user: "James Wilson", action: "Updated Role Permissions", target: "ROLE-003", category: "Admin", ip: "192.168.1.70" },
  { id: "AUD-12838", timestamp: "Mar 9, 2026 17:30:55", user: "Linda Chen", action: "Created Application", target: "LN-8932", category: "Loan Action", ip: "192.168.1.75" },
  { id: "AUD-12837", timestamp: "Mar 9, 2026 16:20:33", user: "System", action: "Backup Completed", target: "DB-MAIN", category: "System", ip: "—" },
  { id: "AUD-12836", timestamp: "Mar 9, 2026 15:55:18", user: "Sarah Jenkins", action: "Uploaded Document", target: "DOC-9921", category: "Document", ip: "192.168.1.50" },
];

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

export default function AuditLogsPage() {
  return (
    <>
      <Header title="System Audit Logs" />
      <div className="p-6 space-y-4">
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
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
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
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Download className="mr-2 h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Timestamp</TableHead>
                <TableHead>Log ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="pr-6">IP Address</TableHead>
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
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${categoryColors[log.category] || "bg-muted"}`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <span className={`text-sm ${log.user === "System" ? "text-muted-foreground italic" : "font-medium"}`}>
                          {log.user}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{log.action}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{log.target}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{log.category}</Badge>
                    </TableCell>
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
      </div>
    </>
  );
}
