import { Suspense } from "react";
import { getProducts } from "@/features/products/actions/get-products";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";
import { ProductsTable } from "@/features/products/components/products-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

async function ProductsContent() {
  const products = await getProducts();
  return <ProductsTable products={products} />;
}

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-4">
      <PageHeader title="Loan Products">
        <Link href="/products/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Product
          </Button>
        </Link>
      </PageHeader>
      <Suspense fallback={<><CardGridSkeleton count={3} /><DataTableSkeleton columns={8} rows={6} /></>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
