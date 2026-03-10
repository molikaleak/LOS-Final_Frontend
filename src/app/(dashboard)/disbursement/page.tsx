import { Suspense } from "react";
import { getDisbursements } from "@/features/disbursement/actions/get-disbursements";
import { DisbursementTable } from "@/features/disbursement/components/disbursement-table";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";

async function DisbursementContent() {
  const data = await getDisbursements();
  return <DisbursementTable disbursements={data} />;
}

export default function DisbursementPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Loan Disbursement" />
      <Suspense fallback={<><CardGridSkeleton count={4} /><DataTableSkeleton columns={8} rows={5} /></>}>
        <DisbursementContent />
      </Suspense>
    </div>
  );
}
