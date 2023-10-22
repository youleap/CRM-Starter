import { useQuery } from "@tanstack/react-query";
import { DealData } from "@/components/components/Table/DealData";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { queryKeys } from "@/server-cache/queryKeys";

export function useDeal({
  id,
  organizationId,
}: {
  id: string;
  organizationId: string;
}) {
  return useQuery({
    queryFn: async () => {
      return (await fetchWorkflowService(config.fetchDealUrl, {
        body: {
          id,
          organizationId,
        },
      })) as DealData;
    },
    queryKey: queryKeys.deal({ dealId: id, organizationId }),
  });
}
