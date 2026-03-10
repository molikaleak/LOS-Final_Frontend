"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ShieldAlert,
  FlaskConical,
  AlertTriangle,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mainNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Loan Applications", href: "/loans", icon: FileText },
  { label: "Loan Products", href: "/products", icon: Package },
  { label: "Approvals", href: "/approvals", icon: CheckSquare },
  { label: "Disbursement", href: "/disbursement", icon: Wallet },
  { label: "Repayments", href: "/repayments", icon: Receipt },
  { label: "Merchants", href: "/merchants", icon: Store },
];

const analyticsNavItems = [
  { label: "Credit Scoring", href: "/credit-scoring", icon: CreditCard },
  { label: "Risk Analytics", href: "/risk-analytics", icon: BarChart3 },
  { label: "Model Testing", href: "/model-testing", icon: FlaskConical },
  { label: "Fraud Detection", href: "/fraud-detection", icon: AlertTriangle },
];

const systemNavItems = [
  { label: "Users & Roles", href: "/users", icon: Users },
  { label: "Audit Logs", href: "/audit-logs", icon: ClipboardList },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface NavItemProps {
  item: { label: string; href: string; icon: React.ElementType };
  collapsed: boolean;
  isActive: boolean;
}

function NavItem({ item, collapsed, isActive }: NavItemProps) {
  const Icon = item.icon;

  const linkContent = (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive &&
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("h-[18px] w-[18px] shrink-0", collapsed && "h-5 w-5")} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger>{linkContent}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex h-16 items-center border-b border-sidebar-border px-4",
        collapsed && "justify-center px-2"
      )}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">F</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                FinTrack LOS
              </span>
              <span className="text-[11px] text-muted-foreground">
                Loan Management
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Loan Management
          </p>
        )}
        <nav className="flex flex-col gap-0.5">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              collapsed={collapsed}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>

        <Separator className="my-4" />

        {!collapsed && (
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Analytics & Risk
          </p>
        )}
        <nav className="flex flex-col gap-0.5">
          {analyticsNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              collapsed={collapsed}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>

        <Separator className="my-4" />

        {!collapsed && (
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            System
          </p>
        )}
        <nav className="flex flex-col gap-0.5">
          {systemNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              collapsed={collapsed}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            collapsed && "justify-center px-0"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="Marcus Johnson" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              MJ
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-sidebar-foreground">
                Marcus Johnson
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                Head Administrator
              </span>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "mt-2 w-full justify-center text-muted-foreground hover:text-foreground",
            collapsed && "px-0"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Collapse
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
