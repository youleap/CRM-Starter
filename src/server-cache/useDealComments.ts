import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/server-cache/queryKeys";
import { fetchComments } from "@/server/fetchComments";

export function useComments(dealId: string) {
  return useQuery({
    queryFn: async () => {
      return await fetchComments(dealId);
    },
    queryKey: queryKeys.dealComments(dealId),
  });
}
