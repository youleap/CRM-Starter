import { useQuery } from "@tanstack/react-query";
import { DealData } from "@/components/components/Table/DealData";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { queryKeys } from "@/server-cache/queryKeys";


export function useDeals({ organizationId }: { organizationId: string }) {
  return useQuery({
    queryFn: async () => {
      return (await fetchWorkflowService(config.fetchDealsUrl, {
        body: {
          organizationId,
        },
      })) as Array<DealData>;
    },
    queryKey: queryKeys.deals({ organizationId }),
  });
}