import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DealData } from "@/components/components/Table/DealData";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { queryKeys } from "@/server-cache/queryKeys";


export function useDeleteDeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      dealId,
      organizationId,
    }: {
      dealId: string;
      organizationId: string;
    }) => {
      return (await fetchWorkflowService(config.deleteDealUrl, {
        body: { id: dealId, organizationId },
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