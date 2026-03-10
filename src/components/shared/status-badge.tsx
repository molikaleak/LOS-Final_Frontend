import { Badge } from "@/components/ui/badge";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const STATUS_VARIANT_MAP: Record<string, BadgeVariant> = {
  // Loan statuses
  Approved: "default",
  "Under Review": "secondary",
  "Documents Pending": "outline",
  Rejected: "destructive",
  Disbursed: "default",

  // Disbursement statuses
  Completed: "default",
  Processing: "secondary",
  "Pending Approval": "outline",

  // Repayment statuses
  Paid: "default",
  Upcoming: "secondary",
  Overdue: "destructive",

  // Product statuses
  Active: "default",
  Draft: "secondary",
  Inactive: "outline",

  // User statuses
  Away: "secondary",

  // Test statuses
  Passed: "default",
  Warning: "secondary",
  Testing: "outline",

  // Risk levels
  Low: "default",
  Medium: "secondary",
  "Medium-High": "secondary",
  High: "destructive",

  // Fraud severity
  Critical: "destructive",

  // Generic
  Verified: "default",
  Pending: "outline",
  "Under Investigation": "secondary",
  Investigating: "secondary",
  Reviewing: "secondary",
  "Confirmed Fraud": "destructive",
  Escalated: "destructive",
  Cleared: "default",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = STATUS_VARIANT_MAP[status] || "secondary";
  return (
    <Badge variant={variant} className={`text-xs font-medium ${className ?? ""}`}>
      {status}
    </Badge>
  );
}
