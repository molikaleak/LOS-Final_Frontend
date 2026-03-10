"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PendingTask } from "../types";

const priorityColors: Record<string, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-success",
};

export function PendingTasks({ tasks }: { tasks: PendingTask[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Pending Tasks
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {tasks.length} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <span
                className={`mt-1.5 inline-block h-2 w-2 rounded-full ${
                  priorityColors[task.priority] || "bg-muted"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {task.description}
                </p>
              </div>
              <span className="text-[11px] text-muted-foreground shrink-0">
                {task.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
