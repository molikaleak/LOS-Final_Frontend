import { Suspense } from "react";
import { getAuditLogs } from "@/features/audit-logs/actions/get-audit-logs";
import { AuditLogsTable } from "@/features/audit-logs/components/audit-logs-table";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";

async function AuditLogsContent() {
  const logs = await getAuditLogs();
  return <AuditLogsTable logs={logs} />;
}

export default function AuditLogsPage() {
  return (
    <div className="p-6 space-y-4">
      <PageHeader title="System Audit Logs" />
      <Suspense fallback={<><CardGridSkeleton count={4} /><DataTableSkeleton columns={7} rows={8} /></>}>
        <AuditLogsContent />
      </Suspense>
    </div>
  );
}
