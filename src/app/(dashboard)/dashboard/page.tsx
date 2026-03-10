import { Suspense } from "react";
import { getDashboardData } from "@/features/dashboard/actions/get-dashboard-data";
import { KPICards } from "@/features/dashboard/components/kpi-cards";
import { LoanTrendsChart } from "@/features/dashboard/components/loan-trends-chart";
import { LoanStatusBreakdownCard } from "@/features/dashboard/components/loan-status-breakdown";
import { RecentApplications } from "@/features/dashboard/components/recent-applications";
import { PendingTasks } from "@/features/dashboard/components/pending-tasks";
import { PageHeader } from "@/components/shared/page-header";
import {
  CardGridSkeleton,
  ChartSkeleton,
  DataTableSkeleton,
} from "@/components/shared/data-table-skeleton";

async function DashboardContent() {
  const data = await getDashboardData();

  return (
    <>
      <KPICards stats={data.stats} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <LoanTrendsChart data={data.trendData} />
        <LoanStatusBreakdownCard data={data.statusBreakdown} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentApplications applications={data.recentApplications} />
        <PendingTasks tasks={data.pendingTasks} />
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Dashboard" />
      <Suspense
        fallback={
          <div className="space-y-6">
            <CardGridSkeleton count={5} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ChartSkeleton />
              </div>
              <ChartSkeleton />
            </div>
            <DataTableSkeleton columns={7} rows={5} />
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </div>
  );
}
