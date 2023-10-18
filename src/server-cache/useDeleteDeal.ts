import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DealData } from "@/components/components/Table/DealData";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { queryKeys } from "@/server-cache/queryKeys";

export function useDeleteDeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rowId: string) => {
      return (await fetchWorkflowService(config.deleteDealUrl, {
        body: { id: rowId },
      })) as DealData;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.deals });
    },
  });
}
