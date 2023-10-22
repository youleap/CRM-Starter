import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DealData } from "@/components/components/Table/DealData";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { queryKeys } from "@/server-cache/queryKeys";
import { Comment } from "@/server/Comment";

export function useCreateDealComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Comment, "id">) => {
      return (await fetchWorkflowService(config.createCommentsUrl, {
        body: data,
      })) as DealData;
    },
    onSuccess: async (_, variables) => {
      const { dealId, organizationId } = variables;
      await queryClient.invalidateQueries({
        queryKey: queryKeys.dealComments({ organizationId, dealId }),
      });
    },
  });
}
