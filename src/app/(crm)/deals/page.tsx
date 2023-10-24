"use client";

import { pathFor } from "@nirtamir2/next-static-paths";
import { useRouter } from "next/navigation";
import { DealTable } from "@/components/components/Table/DealTable";
import { useDeals } from "@/server-cache/useDeals";

export default function DealsPage() {
  const dealsQuery = useDeals();
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
