import { Suspense } from "react";
import { getApprovals } from "@/features/approvals/actions/get-approvals";
import { ApprovalCards } from "@/features/approvals/components/approval-cards";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";

async function ApprovalsContent() {
  const approvals = await getApprovals();
  return <ApprovalCards approvals={approvals} />;
}

export default function ApprovalsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Approvals Workflow" />
      <Suspense fallback={<><CardGridSkeleton count={4} /><DataTableSkeleton columns={6} rows={5} /></>}>
        <ApprovalsContent />
      </Suspense>
    </div>
  );
}
