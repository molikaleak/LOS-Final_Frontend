import { Suspense } from "react";
import { getLoans } from "@/features/loans/actions/get-loans";
import { PageHeader } from "@/components/shared/page-header";
import { DataTableSkeleton, CardGridSkeleton } from "@/components/shared/data-table-skeleton";
import { LoanTable } from "@/features/loans/components/loan-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

async function LoansContent() {
  const loans = await getLoans();
  return <LoanTable loans={loans} />;
}

export default function LoansPage() {
  return (
    <div className="p-6 space-y-4">
      <PageHeader title="Loan Applications">
        <Link href="/loans/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </Link>
      </PageHeader>
      <Suspense
        fallback={
          <div className="space-y-4">
            <CardGridSkeleton count={4} />
            <DataTableSkeleton columns={10} rows={8} />
          </div>
        }
      >
        <LoansContent />
      </Suspense>
    </div>
  );
}
