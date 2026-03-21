"use client";

import { Bell, Check, Info, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { useRoleStore, AppNotification } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";

const IconMap = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  success: <CheckCircle2 className="h-4 w-4 text-success" />,
  warning: <AlertTriangle className="h-4 w-4 text-warning" />,
  error: <X className="h-4 w-4 text-destructive" />,
};

function NotificationItem({ notification, onRead }: { notification: AppNotification, onRead: (id: string) => void }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-md p-3 text-sm transition-colors cursor-pointer hover:bg-muted/50",
        !notification.read && "bg-muted/30"
      )}
      onClick={() => {
        if (!notification.read) onRead(notification.id);
      }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {IconMap[notification.type]}
        </div>
        <div className="grid gap-0.5 flex-1">
          <div className="flex items-center justify-between">
            <span className={cn("font-semibold", !notification.read && "text-foreground font-bold")}>
              {notification.title}
            </span>
            {!notification.read && (
              <span className="flex h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
          <span className="text-muted-foreground line-clamp-2 leading-snug">
            {notification.message}
          </span>
          <div className="flex items-center justify-between mt-1">
             <span className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider">
               {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
             </span>
             {notification.link && (
               <Link 
                  href={notification.link} 
                  className="text-[10px] text-primary hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!notification.read) onRead(notification.id);
                  }}
                >
                 View details
               </Link>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotificationsPopover() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, clearAllNotifications } = useRoleStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-muted">
        <Bell className="h-[18px] w-[18px] text-muted-foreground" />
        {unreadCount > 0 && (
          <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full px-1 text-[10px] bg-destructive text-destructive-foreground hover:bg-destructive shadow-sm animate-in zoom-in pointer-events-none">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex flex-col gap-0.5">
             <span className="font-semibold text-sm">Notifications</span>
             <span className="text-xs text-muted-foreground">You have {unreadCount} unread messages.</span>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs text-primary hover:text-primary/80"
              onClick={markAllNotificationsAsRead}
            >
              <Check className="mr-1 h-3 w-3" />
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="flex max-h-[400px] flex-col overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-sm text-muted-foreground">
              <Bell className="mb-2 h-8 w-8 text-muted-foreground/40" />
              <p>You&apos;re all caught up!</p>
              <p className="text-xs mt-1">No new notifications.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 p-2">
              {notifications.map((notification) => (
                <NotificationItem 
                   key={notification.id} 
                   notification={notification} 
                   onRead={markNotificationAsRead} 
                />
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              className="w-full h-8 text-xs text-muted-foreground hover:bg-muted"
              onClick={clearAllNotifications}
            >
              Clear all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
