import { useQuery } from "@tanstack/react-query";
import { DealData } from "@/components/components/Table/DealData";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { queryKeys } from "@/server-cache/queryKeys";

export function useDeals() {
  return useQuery({
    queryFn: async () => {
      return (await fetchWorkflowService(config.fetchDealsUrl, {
        body: {},
      })) as Array<DealData>;
    },
    queryKey: queryKeys.deals,
  });
}
