import { Suspense } from "react";
import { getTestResults } from "@/features/model-testing/actions/get-test-results";
import { ModelTestingDashboard } from "@/features/model-testing/components/model-testing-dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton } from "@/components/shared/data-table-skeleton";

async function ModelTestingContent() {
  const results = await getTestResults();
  return <ModelTestingDashboard results={results} />;
}

export default function ModelTestingPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Model Testing & Simulation" />
      <Suspense fallback={<CardGridSkeleton count={4} />}>
        <ModelTestingContent />
      </Suspense>
    </div>
  );
}
