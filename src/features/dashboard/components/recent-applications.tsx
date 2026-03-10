"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { RecentApplication } from "../types";

export function RecentApplications({
  applications,
}: {
  applications: RecentApplication[];
}) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Recent Applications
          </CardTitle>
          <Link href="/loans">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-primary"
            >
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
            {applications.map((app) => (
              <TableRow
                key={app.id}
                className="cursor-pointer hover:bg-muted/50"
              >
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
  );
}
