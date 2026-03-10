"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import type { Loan } from "../types";

export function LoanTable({ loans }: { loans: Loan[] }) {
  return (
    <>
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
                <Input
                  placeholder="Search by name, ID, or type..."
                  className="pl-9 h-9"
                />
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
              <TableRow
                key={loan.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="pl-6">
                  <Link
                    href={`/loans/${loan.id}`}
                    className="flex items-center gap-3"
                  >
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
                <TableCell className="text-muted-foreground">
                  {loan.term}
                </TableCell>
                <TableCell>{loan.rate}</TableCell>
                <TableCell>
                  <span
                    className={`font-semibold ${
                      loan.score >= 750
                        ? "text-success"
                        : loan.score >= 650
                          ? "text-warning"
                          : "text-destructive"
                    }`}
                  >
                    {loan.score}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={loan.status} />
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {loan.date}
                </TableCell>
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
          <p className="text-sm text-muted-foreground">
            Showing 1-{loans.length} of 1,284 applications
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 bg-primary text-primary-foreground"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
