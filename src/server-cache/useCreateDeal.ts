import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DealData} from "@/components/components/Table/DealData";
import {config} from "@/config/config";
import {fetchWorkflowService} from "@/lib/fetchWorkflowService";
import {queryKeys} from "@/server-cache/queryKeys";

export function useCreateDeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<DealData, "id">) => {
      return (await fetchWorkflowService(config.createDealUrl, {
        body: data,
      })) as DealData;
    },
      onSuccess: async (_, variables) => {
          const {organizationId} = variables;
      await queryClient.invalidateQueries({
        queryKey: queryKeys.deals({ organizationId }),
      });
    },
  });
}
