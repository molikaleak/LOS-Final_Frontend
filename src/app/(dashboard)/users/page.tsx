import { Suspense } from "react";
import { getUsers } from "@/features/users/actions/get-users";
import { UsersTabs } from "@/features/users/components/users-tabs";
import { PageHeader } from "@/components/shared/page-header";
import { CardGridSkeleton, DataTableSkeleton } from "@/components/shared/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

async function UsersContent() {
  const data = await getUsers();
  return <UsersTabs users={data.users} roles={data.roles} />;
}

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="User Management & Roles">
        <Button size="sm"><Plus className="mr-2 h-4 w-4" />Add User</Button>
      </PageHeader>
      <Suspense fallback={<><CardGridSkeleton count={3} /><DataTableSkeleton columns={6} rows={6} /></>}>
        <UsersContent />
      </Suspense>
    </div>
  );
}
