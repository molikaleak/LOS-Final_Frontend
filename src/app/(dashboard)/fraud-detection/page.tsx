import { Suspense } from "react";
import { getFraudData } from "@/features/fraud-detection/actions/get-fraud-data";
import { FraudDashboard } from "@/features/fraud-detection/components/fraud-dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, ChartSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";

async function FraudContent() {
  const data = await getFraudData();
  return <FraudDashboard data={data} />;
}

export default function FraudDetectionPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Fraud Detection Dashboard" />
      <Suspense fallback={<><CardGridSkeleton count={4} /><div className="grid grid-cols-3 gap-6"><div className="col-span-2"><DataTableSkeleton columns={7} rows={6} /></div><div className="space-y-6"><ChartSkeleton /><ChartSkeleton /></div></div></>}>
        <FraudContent />
      </Suspense>
    </div>
  );
}
