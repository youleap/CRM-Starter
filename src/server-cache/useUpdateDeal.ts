import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DealData } from "@/components/components/Table/DealData";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { queryKeys } from "@/server-cache/queryKeys";


export function useUpdateDeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: DealData;
      organizationId: string;
    }) => {
      return (await fetchWorkflowService(config.updateDealUrl, {
        body: { ...data, id },
      })) as DealData;
    },
    onSuccess: async (_, variables) => {
      const { organizationId } = variables;

      await queryClient.invalidateQueries({
        queryKey: queryKeys.deals({ organizationId }),
      });
    },
  });
}