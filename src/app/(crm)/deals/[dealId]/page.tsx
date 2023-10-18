import { ReactNode } from "react";
import { DealModalContent } from "@/components/components/DealModalContent";

interface Props {
  modal?: ReactNode;
  params: {
    dealId: string;
  };
}

export default function DealPage(props: Props) {
  const { params } = props;
  const { dealId } = params;

  return <DealModalContent dealId={dealId} />;
}
