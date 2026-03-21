import { Suspense } from "react";
import { getRepayments } from "@/features/repayments/actions/get-repayments";
import { RepaymentsTable } from "@/features/repayments/components/repayments-table";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";

async function RepaymentsContent() {
  const data = await getRepayments();
  return <RepaymentsTable repayments={data} />;
}

export default function RepaymentsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Repayment Management" />
      <Suspense fallback={<><CardGridSkeleton count={4} /><DataTableSkeleton columns={8} rows={5} /></>}>
        <RepaymentsContent />
      </Suspense>
    </div>
  );
}
