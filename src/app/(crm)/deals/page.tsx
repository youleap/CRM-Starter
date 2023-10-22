"use client";

import { useAuth } from "@clerk/nextjs";
import { pathFor } from "@nirtamir2/next-static-paths";
import { useRouter } from "next/navigation";
import { DealTable } from "@/components/components/Table/DealTable";
import { useDeals } from "@/server-cache/useDeals";

function DealsPageInner({ organizationId }: { organizationId: string }) {
  const dealsQuery = useDeals({ organizationId });
  const router = useRouter();
  if (dealsQuery.isPending) {
    return "Loading";
  }
  if (dealsQuery.isError) {
    return dealsQuery.error.message;
  }
  return (
    <DealTable
      data={dealsQuery.data}
      onCellClick={(dealId) => {
        router.push(pathFor("/deals/[dealId]", { dealId }));
      }}
    />
  );
}

export default function DealsPage() {
  const { orgId } = useAuth();
  if (orgId == null) {
    return null;
  }
  return <DealsPageInner organizationId={orgId} />;
}
