import { Suspense } from "react";
import { getLoanById } from "@/features/loans/actions/get-loan-by-id";
import { LoanDetailContent } from "@/features/loans/components/loan-detail-tabs";
import { PageHeader } from "@/components/shared/page-header";
import { DataTableSkeleton, CardGridSkeleton } from "@/components/shared/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function LoanContent({ id }: { id: string }) {
  const loan = await getLoanById(id);
  return <LoanDetailContent loan={loan} />;
}

export default async function LoanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/loans">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader title={`Loan Application #${id}`} />
      </div>
      <Suspense
        fallback={
          <div className="space-y-6">
            <CardGridSkeleton count={4} />
            <DataTableSkeleton columns={4} rows={4} />
          </div>
        }
      >
        <LoanContent id={id} />
      </Suspense>
    </div>
  );
}
