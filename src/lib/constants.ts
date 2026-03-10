import {
  LayoutDashboard,
  FileText,
  Package,
  CheckSquare,
  Wallet,
  Receipt,
  Store,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  FlaskConical,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

export const APP_NAME = "FinTrack LOS";
export const APP_DESCRIPTION = "Loan Origination System — Loan Management Platform";

export const SESSION_COOKIE_NAME = "los-session";

export const PUBLIC_ROUTES = ["/login", "/api", "/_next", "/favicon.ico"];

export type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Loan Management",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Loan Applications", href: "/loans", icon: FileText },
      { label: "Loan Products", href: "/products", icon: Package },
      { label: "Approvals", href: "/approvals", icon: CheckSquare },
      { label: "Disbursement", href: "/disbursement", icon: Wallet },
      { label: "Repayments", href: "/repayments", icon: Receipt },
      { label: "Merchants", href: "/merchants", icon: Store },
    ],
  },
  {
    title: "Analytics & Risk",
    items: [
      { label: "Credit Scoring", href: "/credit-scoring", icon: CreditCard },
      { label: "Risk Analytics", href: "/risk-analytics", icon: BarChart3 },
      { label: "Model Testing", href: "/model-testing", icon: FlaskConical },
      { label: "Fraud Detection", href: "/fraud-detection", icon: AlertTriangle },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Users & Roles", href: "/users", icon: Users },
      { label: "Audit Logs", href: "/audit-logs", icon: ClipboardList },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
