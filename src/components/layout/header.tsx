"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NotificationsPopover } from "./notifications-popover";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-end border-b border-border bg-card px-6 shrink-0 z-10 relative">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search loans, customers..."
            className="h-9 w-[280px] rounded-lg bg-muted/50 pl-9 text-sm focus-visible:bg-transparent"
          />
        </div>
        <NotificationsPopover />
      </div>
    </header>
  );
}
