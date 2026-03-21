import { Suspense } from "react";
import { getMerchants } from "@/features/merchants/actions/get-merchants";
import { MerchantsTable } from "@/features/merchants/components/merchants-table";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

async function MerchantsContent() {
  const data = await getMerchants();
  return <MerchantsTable merchants={data} />;
}

export default function MerchantsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="BNPL Merchant Integration">
        <Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Merchant</Button>
      </PageHeader>
      <Suspense fallback={<><CardGridSkeleton count={4} /><DataTableSkeleton columns={8} rows={5} /></>}>
        <MerchantsContent />
      </Suspense>
    </div>
  );
}
