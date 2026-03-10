"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Shield, Users as UsersIcon, Settings, MoreHorizontal, Edit, Trash2 } from "lucide-react";

const users = [
  { id: "USR-001", name: "Marcus Johnson", initials: "MJ", email: "marcus@fintrack.com", role: "Head Administrator", department: "Administration", status: "Active", lastLogin: "2 min ago" },
  { id: "USR-002", name: "Sarah Jenkins", initials: "SJ", email: "sarah@fintrack.com", role: "Senior Loan Officer", department: "Lending", status: "Active", lastLogin: "15 min ago" },
  { id: "USR-003", name: "David Park", initials: "DP", email: "david@fintrack.com", role: "Credit Analyst", department: "Risk", status: "Active", lastLogin: "1h ago" },
  { id: "USR-004", name: "Maria Garcia", initials: "MG", email: "maria@fintrack.com", role: "Risk Manager", department: "Risk", status: "Active", lastLogin: "3h ago" },
  { id: "USR-005", name: "James Wilson", initials: "JW", email: "james@fintrack.com", role: "Compliance Officer", department: "Compliance", status: "Away", lastLogin: "1d ago" },
  { id: "USR-006", name: "Linda Chen", initials: "LC", email: "linda@fintrack.com", role: "Junior Loan Officer", department: "Lending", status: "Active", lastLogin: "30 min ago" },
];

const roles = [
  { name: "Head Administrator", users: 1, permissions: "Full Access", description: "Complete system access and configuration" },
  { name: "Senior Loan Officer", users: 4, permissions: "Loan Management, Approvals", description: "Manage loan applications and approve up to $100K" },
  { name: "Credit Analyst", users: 3, permissions: "Risk Analysis, Reports", description: "Access credit scoring and risk reports" },
  { name: "Risk Manager", users: 2, permissions: "Risk, Approvals, Reports", description: "Risk oversight and high-value approvals" },
  { name: "Compliance Officer", users: 2, permissions: "Audit, Compliance, Reports", description: "Regulatory compliance and audit access" },
  { name: "Junior Loan Officer", users: 5, permissions: "Loan Applications", description: "Create and process loan applications" },
];

export default function UsersPage() {
  return (
    <>
      <Header title="User Management & Roles">
        <Button size="sm" className="ml-4"><Plus className="mr-2 h-4 w-4" />Add User</Button>
      </Header>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg p-2.5 bg-primary/10"><UsersIcon className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Total Users</p>
                <p className="text-xl font-bold">17</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg p-2.5 bg-success/10"><Shield className="h-5 w-5 text-success" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Active Roles</p>
                <p className="text-xl font-bold">6</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg p-2.5 bg-warning/10"><Settings className="h-5 w-5 text-warning" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Pending Invites</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{user.initials}</AvatarFallback></Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{user.role}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{user.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-success" : "bg-warning"}`} />
                          <span className="text-sm">{user.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{user.lastLogin}</TableCell>
                      <TableCell className="pr-6">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => (
                <Card key={role.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{role.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{role.users} users</Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground">Permissions</p>
                      <p className="text-xs font-medium mt-0.5">{role.permissions}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
