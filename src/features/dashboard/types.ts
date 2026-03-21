export type KPIStat = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
};

export type RecentApplication = {
  id: string;
  name: string;
  initials: string;
  type: string;
  amount: string;
  status: string;
  date: string;
  score: number;
};

export type PendingTask = {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  time: string;
};

export type LoanTrendData = {
  month: string;
  value: number;
};

export type LoanStatusBreakdown = {
  label: string;
  value: number;
  total: number;
};

export type DashboardData = {
  stats: KPIStat[];
  trendData: LoanTrendData[];
  statusBreakdown: LoanStatusBreakdown[];
  recentApplications: RecentApplication[];
  pendingTasks: PendingTask[];
};
