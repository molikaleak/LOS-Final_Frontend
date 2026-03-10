import { Suspense } from "react";
import { getCreditData } from "@/features/credit-scoring/actions/get-credit-data";
import { CreditScoringDashboard } from "@/features/credit-scoring/components/credit-scoring-dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, ChartSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";

async function CreditScoringContent() {
  const data = await getCreditData();
  return <CreditScoringDashboard data={data} />;
}

export default function CreditScoringPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Credit Scoring Engine" />
      <Suspense fallback={<><CardGridSkeleton count={4} /><div className="grid grid-cols-2 gap-6"><ChartSkeleton /><ChartSkeleton /></div><DataTableSkeleton columns={7} rows={4} /></>}>
        <CreditScoringContent />
      </Suspense>
    </div>
  );
}
