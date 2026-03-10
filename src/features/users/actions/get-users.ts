import type { User, Role } from "../types";

export async function getUsers(): Promise<{ users: User[]; roles: Role[] }> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    users: [
      { id: "USR-001", name: "Marcus Johnson", initials: "MJ", email: "marcus@fintrack.com", role: "Head Administrator", department: "Administration", status: "Active", lastLogin: "2 min ago" },
      { id: "USR-002", name: "Sarah Jenkins", initials: "SJ", email: "sarah@fintrack.com", role: "Senior Loan Officer", department: "Lending", status: "Active", lastLogin: "15 min ago" },
      { id: "USR-003", name: "David Park", initials: "DP", email: "david@fintrack.com", role: "Credit Analyst", department: "Risk", status: "Active", lastLogin: "1h ago" },
      { id: "USR-004", name: "Maria Garcia", initials: "MG", email: "maria@fintrack.com", role: "Risk Manager", department: "Risk", status: "Active", lastLogin: "3h ago" },
      { id: "USR-005", name: "James Wilson", initials: "JW", email: "james@fintrack.com", role: "Compliance Officer", department: "Compliance", status: "Away", lastLogin: "1d ago" },
      { id: "USR-006", name: "Linda Chen", initials: "LC", email: "linda@fintrack.com", role: "Junior Loan Officer", department: "Lending", status: "Active", lastLogin: "30 min ago" },
    ],
    roles: [
      { name: "Head Administrator", users: 1, permissions: "Full Access", description: "Complete system access and configuration" },
      { name: "Senior Loan Officer", users: 4, permissions: "Loan Management, Approvals", description: "Manage loan applications and approve up to $100K" },
      { name: "Credit Analyst", users: 3, permissions: "Risk Analysis, Reports", description: "Access credit scoring and risk reports" },
      { name: "Risk Manager", users: 2, permissions: "Risk, Approvals, Reports", description: "Risk oversight and high-value approvals" },
      { name: "Compliance Officer", users: 2, permissions: "Audit, Compliance, Reports", description: "Regulatory compliance and audit access" },
      { name: "Junior Loan Officer", users: 5, permissions: "Loan Applications", description: "Create and process loan applications" },
    ],
  };
}
