import { Suspense } from "react";
import { getApprovalById } from "@/features/approvals/actions/get-approval-by-id";
import { ApprovalDetailContent } from "@/features/approvals/components/approval-detail-view";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, ChartSkeleton } from "@/components/shared/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function ApprovalContent({ id }: { id: string }) {
  const approval = await getApprovalById(id);

  if (!approval) {
    notFound();
  }

  return <ApprovalDetailContent approval={approval} />;
}

export default async function ApprovalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/approvals">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader title={`Approval Action: ${id}`} />
      </div>

      <Suspense fallback={<><CardGridSkeleton count={4} /><div className="grid grid-cols-3 gap-6"><div className="col-span-2"><ChartSkeleton /></div><ChartSkeleton /></div></>}>
        <ApprovalContent id={id} />
      </Suspense>
    </div>
  );
}
