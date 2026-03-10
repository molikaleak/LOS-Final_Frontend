import { Suspense } from "react";
import { getRiskData } from "@/features/risk-analytics/actions/get-risk-data";
import { RiskDashboard } from "@/features/risk-analytics/components/risk-dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, ChartSkeleton } from "@/components/shared/data-table-skeleton";

async function RiskContent() {
  const data = await getRiskData();
  return <RiskDashboard data={data} />;
}

export default function RiskAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Risk Analytics Dashboard" />
      <Suspense fallback={<><CardGridSkeleton count={4} /><div className="grid grid-cols-3 gap-6"><div className="col-span-2"><ChartSkeleton /></div><ChartSkeleton /></div></>}>
        <RiskContent />
      </Suspense>
    </div>
  );
}
