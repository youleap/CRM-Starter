export const queryKeys = {
  deals: ["deals"],
  deal: (dealId: string) => [queryKeys.deals, dealId],
  dealComments: (dealId: string) => [queryKeys.deals, dealId, "comments"],
} as const;
