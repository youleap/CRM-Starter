"use client";

import { useAuth } from "@clerk/nextjs";
import { DealModalContent } from "@/components/components/DealModalContent";

interface Props {
  params: {
    dealId: string;
  };
}

export default function DealPage(props: Props) {
  const { params } = props;
  const { dealId } = params;
  const { orgId } = useAuth();

  if (orgId == null) {
    return null;
  }

  return <DealModalContent dealId={dealId} organizationId={orgId} />;
}
