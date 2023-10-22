"use client";

import { useAuth } from "@clerk/nextjs";
import { pathFor } from "@nirtamir2/next-static-paths";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { CommentList } from "@/components/components/CommentList";
import { DeleteDealDialog } from "@/components/components/Table/DeleteDealDialog";
import { EditDeal } from "@/components/components/Table/EditDealForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateDealComment } from "@/server-cache/useCreateDealComment";

interface Props {
  dealId: string;
    organizationId: string;
}

export function DealModalContent(props: Props) {
  const { dealId, organizationId } = props;
  const createDealCommentMutation = useCreateDealComment();
  const router = useRouter();
  const { userId, orgId } = useAuth();

  if (userId == null || orgId == null) {
    return null;
  }

  return (
    <div className="h-full w-full bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
      <header className="flex items-center justify-between border-b px-6 py-4 dark:border-zinc-700">
        <h1 className="text-2xl font-bold">Deal Details</h1>
        <div className="flex space-x-2">
          <DeleteDealDialog
            trigger={<Trash height={24} width={24} />}
            dealId={dealId}
            organizationId={organizationId}
            onDeleteSuccess={() => {
              router.push(pathFor("/deals"));
            }}
          />
        </div>
      </header>
      <main className="flex flex-col gap-6 p-6 lg:flex-row">
        <div className="w-full space-y-4 lg:w-1/2">
          <EditDeal dealId={dealId} organizationId={orgId} />
        </div>
        <div className="w-full overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-700 lg:w-1/2">
          <h2 className="border-b px-6 py-4 dark:border-zinc-700">Comments</h2>
          <div className="space-y-4 p-6">
            <CommentList dealId={dealId} organizationId={orgId} />
            <form
              className="mt-4 flex flex-col-reverse space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-700"
              onSubmit={(event) => {
                event.preventDefault();
                const formField = event.currentTarget["new-comment"] as
                  | HTMLInputElement
                  | undefined;
                if (formField == null) {
                  throw new Error("text not found for new comment");
                }
                event.currentTarget.reset();
                const text = formField.value;
                createDealCommentMutation.mutate({
                  organizationId: orgId,
                  dealId,
                  userId,
                  text,
                  timestamp: new Date().toLocaleString(),
                });
              }}
            >
              <Button
                variant="default"
                type="submit"
                disabled={createDealCommentMutation.isPending}
              >
                Send
              </Button>
              <Input
                required
                name="comment"
                className="rounded-lg border p-2"
                id="new-comment"
                placeholder="Type your message..."
              />
              <Label className="mb-2" htmlFor="new-comment">
                New Comment
              </Label>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
