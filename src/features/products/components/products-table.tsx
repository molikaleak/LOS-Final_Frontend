"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Search, Edit, MoreHorizontal } from "lucide-react";
import type { Product } from "../types";

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Active Products</p><p className="text-2xl font-bold mt-1">5</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Applications</p><p className="text-2xl font-bold mt-1">1,361</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Avg. Interest Rate</p><p className="text-2xl font-bold mt-1">7.2%</p></CardContent></Card>
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
                <TableCell><StatusBadge status={product.status} /></TableCell>
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
    </>
  );
}
