export const queryKeys = {
  deals: ({ organizationId }: { organizationId: string }) => [
    { organizationId },
    "deals",
  ],
  deal: ({
    dealId,
    organizationId,
  }: {
    dealId: string;
    organizationId: string;
  }) => [queryKeys.deals({ organizationId }), dealId],
  dealComments: ({
    dealId,
    organizationId,
  }: {
    dealId: string;
    organizationId: string;
  }) => [queryKeys.deals({ organizationId }), dealId, "comments"],
} as const;
