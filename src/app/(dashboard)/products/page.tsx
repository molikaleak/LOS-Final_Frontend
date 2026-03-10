"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";

const products = [
  { id: "PRD-001", name: "Personal Loan - Standard", type: "Personal", rate: "8.5% - 15.0%", minAmount: "$1,000", maxAmount: "$50,000", term: "12-60 months", status: "Active", applications: 342 },
  { id: "PRD-002", name: "Auto Loan - Fixed Rate", type: "Auto", rate: "5.5% - 9.0%", minAmount: "$5,000", maxAmount: "$75,000", term: "24-72 months", status: "Active", applications: 215 },
  { id: "PRD-003", name: "Home Mortgage - Standard", type: "Mortgage", rate: "5.0% - 7.5%", minAmount: "$50,000", maxAmount: "$500,000", term: "180-360 months", status: "Active", applications: 128 },
  { id: "PRD-004", name: "Business Loan - SME", type: "Business", rate: "7.0% - 12.0%", minAmount: "$10,000", maxAmount: "$200,000", term: "12-84 months", status: "Active", applications: 96 },
  { id: "PRD-005", name: "BNPL - Merchant", type: "BNPL", rate: "0% - 3.0%", minAmount: "$100", maxAmount: "$5,000", term: "3-12 months", status: "Active", applications: 580 },
  { id: "PRD-006", name: "Student Loan", type: "Education", rate: "4.0% - 8.0%", minAmount: "$5,000", maxAmount: "$100,000", term: "60-120 months", status: "Draft", applications: 0 },
];

export default function ProductsPage() {
  return (
    <>
      <Header title="Loan Products">
        <Button size="sm" className="ml-4">
          <Plus className="mr-2 h-4 w-4" />
          Create Product
        </Button>
      </Header>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Active Products</p>
              <p className="text-2xl font-bold mt-1">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Applications</p>
              <p className="text-2xl font-bold mt-1">1,361</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Avg. Interest Rate</p>
              <p className="text-2xl font-bold mt-1">7.2%</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9 h-9" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Product Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rate Range</TableHead>
                <TableHead>Amount Range</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="pl-6">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.id}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{product.type}</Badge></TableCell>
                  <TableCell className="font-mono text-sm">{product.rate}</TableCell>
                  <TableCell>{product.minAmount} - {product.maxAmount}</TableCell>
                  <TableCell className="text-muted-foreground">{product.term}</TableCell>
                  <TableCell className="font-semibold">{product.applications}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "Active" ? "default" : "secondary"} className="text-xs">
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                    </div>
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
