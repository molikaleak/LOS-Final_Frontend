"use client";

import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const loans = [
  { id: "LN-8932", name: "Sarah Mitchell", initials: "SM", type: "Personal Loan", amount: "$25,000", term: "36 months", rate: "8.5%", status: "Under Review", date: "Mar 10, 2026", score: 742 },
  { id: "LN-8931", name: "David Chen", initials: "DC", type: "Auto Loan", amount: "$35,500", term: "60 months", rate: "6.2%", status: "Approved", date: "Mar 9, 2026", score: 810 },
  { id: "LN-8930", name: "Emily Rodriguez", initials: "ER", type: "Home Mortgage", amount: "$320,000", term: "360 months", rate: "5.8%", status: "Documents Pending", date: "Mar 9, 2026", score: 695 },
  { id: "LN-8929", name: "Michael Scott", initials: "MS", type: "Business Loan", amount: "$75,000", term: "48 months", rate: "9.1%", status: "Approved", date: "Mar 8, 2026", score: 780 },
  { id: "LN-8928", name: "Pam Beesly", initials: "PB", type: "Personal Loan", amount: "$12,000", term: "24 months", rate: "7.9%", status: "Rejected", date: "Mar 8, 2026", score: 580 },
  { id: "LN-8927", name: "Jim Halpert", initials: "JH", type: "Auto Loan", amount: "$42,000", term: "48 months", rate: "5.5%", status: "Disbursed", date: "Mar 7, 2026", score: 810 },
  { id: "LN-8926", name: "Angela Martin", initials: "AM", type: "Home Mortgage", amount: "$280,000", term: "360 months", rate: "5.9%", status: "Under Review", date: "Mar 7, 2026", score: 720 },
  { id: "LN-8925", name: "Dwight Schrute", initials: "DS", type: "Business Loan", amount: "$150,000", term: "60 months", rate: "8.8%", status: "Approved", date: "Mar 6, 2026", score: 755 },
];

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "Approved": "default",
  "Under Review": "secondary",
  "Documents Pending": "outline",
  "Rejected": "destructive",
  "Disbursed": "default",
};

export default function LoansPage() {
  return (
    <>
      <Header title="Loan Applications">
        <Link href="/loans/new">
          <Button size="sm" className="ml-4">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </Link>
      </Header>
      <div className="p-6 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "All Applications", value: "1,284", active: true },
            { label: "Under Review", value: "286" },
            { label: "Approved", value: "856" },
            { label: "Rejected", value: "142" },
          ].map((tab) => (
            <Card
              key={tab.label}
              className={`cursor-pointer transition-all hover:shadow-md ${
                tab.active ? "border-primary/50 shadow-sm" : ""
              }`}
            >
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{tab.label}</p>
                <p className="text-xl font-bold mt-1">{tab.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search by name, ID, or type..." className="pl-9 h-9" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="disbursed">Disbursed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue placeholder="Loan Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="mortgage">Home Mortgage</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-3.5 w-3.5" />
                  More Filters
                </Button>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-[200px]">Applicant</TableHead>
                <TableHead>Loan ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Credit Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="pr-6 w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="pl-6">
                    <Link href={`/loans/${loan.id}`} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {loan.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{loan.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {loan.id}
                  </TableCell>
                  <TableCell>{loan.type}</TableCell>
                  <TableCell className="font-semibold">{loan.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{loan.term}</TableCell>
                  <TableCell>{loan.rate}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${loan.score >= 750 ? "text-success" : loan.score >= 650 ? "text-warning" : "text-destructive"}`}>
                      {loan.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[loan.status] || "secondary"} className="text-xs">
                      {loan.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{loan.date}</TableCell>
                  <TableCell className="pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t px-6 py-3">
            <p className="text-sm text-muted-foreground">Showing 1-8 of 1,284 applications</p>
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
